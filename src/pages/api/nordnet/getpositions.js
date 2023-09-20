// Eksempel api "metode?"
export default async function handler(req, res) {
    const data = {name: "test", age: 40, id:"xFieAr31"};
    if (data){
        res.status(200).json(data);
    } else (
        res.status(404).json( {message: `Data not found`})
    )
}