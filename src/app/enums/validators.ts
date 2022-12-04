export enum ValidatorsPattern {
  EMAIL = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  PASSWORD =  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  PHONE = '^((373|0?(7|6))([0-9]){7})$'
}
