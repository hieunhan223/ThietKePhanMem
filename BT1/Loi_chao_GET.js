//install npm install express

//Khai bao su dung thu vien ham
const EXPRESS = require ("express")
//Khai bao va khoi dong ung dung
var Ung_dung = EXPRESS()
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.get("/Loi_chao", XL_Tao_Loi_chao)
//Khai bao ham xy ly bien co
function XL_Khoi_dong(req,res)
{
    var Chuoi_HTML=`<div>Ung dung Loi chao (GET) </div>
                    <form action='/Loi_chao' method ='get'>
                        Ho ten <input name ='Th_Ho_ten' autocomplete = "off"/>
                        <button type='Submit'>Dong y</button>
                    </form>`
    res.send(Chuoi_HTML)
}

function XL_Tao_Loi_chao(req,res)
{
    var Ho_ten = req.query.Th_Ho_ten
    var Loi_chao = `<div>Xin chao ${Ho_ten} </div>`
    var Chuoi_HTML=`<div>Ung dung Loi chao (GET) </div>
                    <form action='/Loi_chao' method ='get'>
                        Ho ten <input name ='Th_Ho_ten' autocomplete = "off"/>
                        <button type='Submit'>Dong y</button>
                    </form> ${Loi_chao}` 
    res.send(Chuoi_HTML)
}