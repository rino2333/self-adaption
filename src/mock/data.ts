import { Random } from 'mockjs'
const menus: { [key: string]: [] | Object } = {
    xm: ['张三', '李四', '王五']
}
// 创建自定义 Mock 函数
Random.extend({
    // 自定义函数名: function 函数
    menus: function (n: string | []) {
        return this.pick((n instanceof Array)?n:menus[n]||[...arguments])
    },
    phone: function (n: string | []) {
        return +(this.pick(['132','135','189'])+Random.integer(10000000,99999999))  
    }

})
//数据模板文档   http://mockjs.com/examples.html

// const data:{[key:string]:Function}={};

// for (const key in Random) {
//     const t:Function=(...args:any[])=>Random[key](...args);
//     data[key]=t;
// }
// export default data;
// Random.integer(20,100)   //随机返回20到100的数字
// Random.float(60, 100, 3, 5) //随机返回60到100的带有3到5位小数的数字
// Random.string() //随机返回一个字符串
// Random.string(5) //随机返回一个长度为5的字符串
// Random.string(7, 10)//随机返回一个长度为5到7位的字符串
// Random.date()//随机返回一个日期
// Random.date('yyyy-MM-dd')//随机返回一个格式化日期
// Random.image()//随机返回一张图片
// Random.image('200x100')//随机返回一张带尺寸的图片
// Random.image('200x100', '#FF6600')//随机返回一张带尺寸和颜色的图片
// Random.paragraph()//随机返回一段文字
// Random.cparagraph()//随机返回一段中文文字
// Random.cparagraph(1, 3)//随机返回1到3段中文文字
// Random.csentence()//随机返回一句中文
// Random.ctitle()//随机返回一个中文标题

