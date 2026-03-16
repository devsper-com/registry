variable "domain" {
  type        = string
  description = "Domain for SES identity (e.g. devsper.com)"
}

variable "config_set_name" {
  type        = string
  default     = "devsper-registry"
  description = "SES configuration set name"
}

variable "dmarc_rua" {
  type        = string
  default     = "mailto:dmarc@devsper.com"
  description = "DMARC RUA reporting address"
}
