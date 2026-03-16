package waitlist

import (
	"encoding/json"
	"net/http"
	"strings"
	"unicode"

	"github.com/devsper-com/registry/api/internal/db"
)

// Disposable/temp email domains — reject these. Duplicates are ignored by DB (ON CONFLICT DO NOTHING).
var disposableDomains = map[string]struct{}{
	"mailinator.com": {}, "tempmail.com": {}, "10minutemail.com": {}, "guerrillamail.com": {},
	"guerrillamail.info": {}, "throwaway.email": {}, "temp-mail.org": {}, "fakeinbox.com": {},
	"trashmail.com": {}, "yopmail.com": {}, "getnada.com": {}, "mailnesia.com": {},
	"sharklasers.com": {}, "guerrillamail.biz": {}, "grr.la": {}, "spam4.me": {},
	"dispostable.com": {}, "maildrop.cc": {}, "tempail.com": {}, "minuteinbox.com": {},
	"emailondeck.com": {}, "mohmal.com": {}, "inboxkitten.com": {}, "tmpeml.com": {},
	"test.com": {}, "example.com": {}, "example.org": {}, "localhost": {},
}

// Request body from homepage waitlist form.
type waitlistRequest struct {
	Email   string `json:"email"`
	UseCase string `json:"use_case"`
	Source  string `json:"source"`
}

// NewHandler returns an HTTP handler for POST /api/waitlist.
// Ignores duplicates (DB ON CONFLICT DO NOTHING); rejects disposable/temp email domains with 400.
func NewHandler(queries *db.Queries) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		var body waitlistRequest
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}
		email := normalizeEmail(body.Email)
		if email == "" {
			http.Error(w, "email required", http.StatusBadRequest)
			return
		}
		if isDisposableEmail(email) {
			http.Error(w, "please use a permanent email address", http.StatusBadRequest)
			return
		}
		useCase := strings.TrimSpace(body.UseCase)
		if useCase == "" {
			useCase = ""
		}
		source := strings.TrimSpace(body.Source)
		if source == "" {
			source = "homepage"
		}
		if err := queries.InsertWaitlist(r.Context(), db.InsertWaitlistParams{
			Email:   email,
			UseCase: useCase,
			Source:  source,
		}); err != nil {
			http.Error(w, "failed to save", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"ok":true}`))
	}
}

func normalizeEmail(s string) string {
	s = strings.TrimSpace(strings.ToLower(s))
	var b strings.Builder
	for _, r := range s {
		if unicode.IsSpace(r) {
			continue
		}
		b.WriteRune(r)
	}
	return b.String()
}

func isDisposableEmail(email string) bool {
	at := strings.LastIndex(email, "@")
	if at <= 0 || at == len(email)-1 {
		return true
	}
	domain := strings.ToLower(email[at+1:])
	_, ok := disposableDomains[domain]
	return ok
}
