
export type Saving = {
    _id: number;
    _creatingContributor: `0x${string}` | undefined;
  };


  export type AnotherSaving = {
    _id: number;
    _creatingContributor: `0x${string}` | undefined;
    cardColor: string;
    _amount: number;
    _amountPerPerson: number
  };