import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  tap,
} from "rxjs";
import { environment } from "src/environments/environment";
import { PostProduct, Product, ResponseRecipeGeneration } from "../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private _productsSubject$ = new BehaviorSubject<Product[]>([]);

  public products$ = this._productsSubject$.asObservable();

  constructor(private http: HttpClient) {}

  private readonly productsUrl = `${environment.productsUrl}`;
  private readonly aiUrl = `${environment.aiUrl}`;

  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${environment.ngrokKey}`,
    "ngrok-skip-browser-warning": "69420",
  };


  public generateRecipe(pList : Product[]) : Observable<ResponseRecipeGeneration>{
    
    const options = {
      url : this.aiUrl,
      headers : this.headers,
      data : pList
    }
    return from(CapacitorHttp.post(options).then((res : HttpResponse) => {
     // console.log(res.data)
      return res.data
    }))
  }

  public getAllDataSubject(): Observable<Product[]> {
    const options = {
      url: this.productsUrl,
      headers: this.headers,
    };
    return from(CapacitorHttp.get(options)).pipe(
      map((res: HttpResponse) => res.data as Product[]),
      tap((data: Product[]) => this._productsSubject$.next(data))
    );
  }

  public getAllData(): Observable<Product[]> {
    const options = {
      url: this.productsUrl,
      headers: this.headers,
    };
    // from() per convertire promise in observable
    return from(
      CapacitorHttp.get(options).then((res: HttpResponse) => {
        return res.data as Product[];
      })
    );
  }

  public delete(products: Product[]): Observable<any> {
    const options = {
      url: `${this.productsUrl}`,
      headers: this.headers,
      data: products
    };
    return from(CapacitorHttp.delete(options).then((res) => {}));
  }

  public addProduct(product: PostProduct): Observable<Product> {
    const payload = {
      pName: product.pName,
      expDate: product.expDate,
      buyDate: product.buyDate,
    };

    const options = {
      url: this.productsUrl,
      headers: this.headers,
      data: payload,
    };

    return from(
      CapacitorHttp.post(options).then((res) => {
        return res.data as Product;
      })
    );
  }

  public updateProduct(product: PostProduct, id: number): Observable<Product> {
    const payload = {
      pName: product.pName || null,
      expDate: product.expDate || null,
      buyDate: product.buyDate || null,
    };

    const options = {
      url: `${this.productsUrl}/${id}`,
      headers: this.headers,
      data: payload,
    };

    return from(
      CapacitorHttp.put(options).then((res) => {
        return res.data as Product;
      })
    );
  }
}
