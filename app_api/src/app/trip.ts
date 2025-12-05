export interface Trip {
  _id?: string;          // Mongo ID 
  code: string;          // unique trip code, e.g. 'HAW01'
  name: string;
  length: number;        // days
  start: Date | string;
  resort: string;
  perPerson: number;     // price
  image?: string;        // optional
  description?: string;  // optional
}
