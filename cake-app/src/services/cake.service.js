import { BASE_URL } from '../constants/constants.js';
class CakeService {

    /**
     * To get cake info
     */
    getCakeList() {
        return fetch(BASE_URL).then(
            
            (data) =>  data.text())
            .then((data) => {
                return Promise.resolve(JSON.parse(data));
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    /**
     * To get cake details for given id
     */
    getCakeDetailsById(id) {
        return fetch(`${BASE_URL}/${id}`).then(
            (data) => data.text()
        )
            .then((data) => {
                return Promise.resolve(JSON.parse(data));
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

  /**
   * To submit cake
   */
    submitCake(cakeInfo) {
        var headers = new Headers();
        cakeInfo.yumFactor = Number(cakeInfo.yumFactor);
        headers.append('Accept', 'application/json'); // This one is enough for GET requests
        headers.append('Content-Type', 'application/json; charset=utf-8'); // This one sends body

        return fetch(BASE_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(cakeInfo)
        })
            .then(
            (data) => data.text()
            ).then((data) => {
                return Promise.resolve(JSON.parse(data));
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}

var cakeService = new CakeService();

export default cakeService;