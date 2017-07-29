/**
 * Created by nursultan on 7/29/17.
 */
export class BaseService {
  protected handleError(error:any):Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
