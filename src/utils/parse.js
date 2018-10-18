export function toJSON(doc){
    if(doc){
        return doc.toJSON()
    }else{
        return null;
    }
}

export function toJSONList(docs){
    return docs.map(toJSON);
}