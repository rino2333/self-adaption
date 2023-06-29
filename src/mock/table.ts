const IsMock=true;
const mocks= [
    {
        url: "/api/htgl/inf/student/list",
        type: "get",
        IsMock:true,
        data:{
            total:1,
            'records|2-10':[
                {
                    "nation": "ERROR 42",
                    "isDwell": "1",
                    "idNo": "282662649606195135",
                    "dormNo": "020704",
                    "modifyTime": "2023-04-13 10:29:31",
                    "politicsFace": "ERROR 42",
                    "punish": null,
                    "graduateTime": null,
                    "specialtyDirection": "无",
                    "id": "55B99B2073D34B2985B66688435C76CB",
                    "dormTower": null,
                    "studentAuditId": "10221EE8F49E4083BBDF1D07E19BEB38",
                    "openid": "oSb7J4jaWD0ycvfZE4zeNPkFodmU",
                    "qqNo": null,
                    "instructor": "王莹莹",
                    "phone": "@phone",
                    "grade": 2023,
                    "specialtyId": "G080749",
                    "dormId": "30D0AC0ECEC04E238DEAE6818F74C160",
                    "name": '@cname',
                    "guardianRelation": "父子",
                    "guardianPhone": "ERROR 42",
                    "nativePlace": null,
                    "studentNo": "1111",
                    "instructorQq": null,
                    "status": "AT_SCHOOL",
                    "instructorId": "D44634B643C748F0B4F6C98300E985DA",
                    "faith": "ERROR 42",
                    "remark": null,
                    "className": "@integer(2020,2023)-@menus(计应,计科)-@integer(1,4)",
                    "bookIsPay": null,
                    "modifyor": "F860659F9C3D412EB27389AD6F34ED53",
                    "familyAddress": null,
                    "accountStatus": "ENABLE",
                    "classId": "025B5C0B4CE34441AD43E6F8D4CBC3F1",
                    "award": null,
                    "specialtyName": "计算机科学与技术",
                    "guardianName": "张三",
                    "wechatNo": null,
                    "instructorMobile": "18674020629",
                    "creator": "05CAAAC132524E62B570A9EB06636BAC",
                    "candidateNo": "653022200001103246",
                    "sex": "F",
                    "avatar": "https://jxjy-att.whxunw.com/hkzk_att/upload/images/2023032214/1B32E625B203435AB93FD734874A5304.png",
                    "notDwellCause": null,
                    "rowId": 1,
                    "isAtSchool": "0",
                    "createTime": "@datetime(2023-MM-dd  HH:mm:ss)",
                    "tuitionPayStatus": null,
                    "specialtyCode": "G080749"
                }
            ]
        }
    },
];
export default mocks.map(e=>{
    return {
        ...e,
        IsMock:(IsMock&&e.IsMock)||false
    }
})