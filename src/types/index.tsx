interface ComputerInformation {
  build_id: string;
  infection_date: string;
  ip: string;
  malware_path: string;
  username: string;
  country: string;
  os: string;
  hwid: string;
}

interface Credentials {
  url: string;
  creds: CredentialsInfo[];
}

interface CredentialsInfo {
  username: string;
  password: string;
  credential_category: string;
}

export interface InfectionsSearchResponse {
  id: string;
  log_checksum: string;
  log_file_name: string;
  date: number;
  stealer_type: string;
  computer_information: ComputerInformation;
  credentials: Credentials[];
}
