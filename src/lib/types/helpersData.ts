export interface helpersData {
  data:
    | {
        attributes: {
          name: string;
          photoURL: string;
          amount: string;
        };
      }[]
    | null;
}
