export default function clean(obj) {
    const propNames = Object.getOwnPropertyNames(obj)
    for (const propName of propNames) {
        if (obj[propName] === null) {
            console.log(propName, obj[propName])
            delete obj[propName]
        }
    }
    return obj
}