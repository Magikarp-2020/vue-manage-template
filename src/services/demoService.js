/**
 * Created by lichao on 2017/2/24.
 */
import xhr from './xhr/xhr';

class DemoService {
    demo(body) {
        return xhr({
            url: "demo",
            method: 'post',
            body
        });
    }
}

export default new DemoService();
