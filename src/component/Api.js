export const Api = (id)=>{
    return{
        articlesfromtexted:"http://localhost:4000/aritclesfromTE",
        categories:"http://localhost:4000/category",
        user:"http://localhost:4000/user",
        SelfDefUser:"http://localhost:4000/user/SelfDefUser",
        comment:"http://localhost:4000/comments",
        allcommnet:"http://localhost:4000/comments/allcommnet",
        commentOwnUser:`http://localhost:4000/comments/${id}`,
        analytics:"http://localhost:4000/user/analytic",
        avertisment : "http://localhost:4000/avertisment",
        mainAvertisment : "http://localhost:4000/avertisment/mainAv"
    }
}