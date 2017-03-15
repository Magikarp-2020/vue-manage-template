/**
 * Created by lichao on 2017/3/15.
 */
import xhr from './xhr/xhr';

class SystemService {
    login(body) {
        return xhr({
            url: '/api/login',
            type: 'post',
            body
        });
    }
}

export default new SystemService();
