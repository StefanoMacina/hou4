export interface Message {
    fromName: string;
    subject: string;
    date: string;
    id: number;
    read: boolean;
  }
  
  export interface Product {
    id: number;
    pName: string;
    buyDate: Date;
    expDate: Date;
    boughtAgo: number;
    daysToExp: number;
    isExpired: Boolean;
  }
  
  export interface PostProduct {
    id? : number;
    pName: string;
    buyDate?: Date;
    expDate: Date;
  }
  export interface ResponseRecipeGeneration{
    title: string,
    ingredientsList: Ingredient[],
    stepsList: Step[]
    text: string;
  }

  export interface Ingredient{
    ing: string
  }

  export interface Step{
    step: string
  }

  export interface SignupRequest{
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    birthdate: Date,
    password: string
  }

  export interface Response{
    code: string,
    message: string
  }

  export interface SigninRequest{
    username: string,
    passwrod: string
  }
