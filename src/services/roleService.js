/**
 * Created by lichao on 2017/3/27.
 */
import xhr from './xhr/xhr';

class RoleService {
    list(body) {
        return xhr({
            url: '/role/list',
            body
        });
    }
}

export default new RoleService();
