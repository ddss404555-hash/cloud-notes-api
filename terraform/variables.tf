// --------------------
// Variables Definition
// --------------------

// Your GCP project ID
variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

// Region for deployment
variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}