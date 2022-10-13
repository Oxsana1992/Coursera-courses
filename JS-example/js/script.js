// 1
// const num = 42;
// // let result
// // if (num > 20) {
// // 	result = 'More then 20'
// // } else {
// // 	result = 'Less then 20'
// // }
// // через тернарные операторы
// const result = num > 20 ? "More then 20" : "Less then 20";
// //console.log(result)

// //2
// let variable; // if it 'undefined'
// let variable2;
// // //!== знак неравенства
// // // || знак 'или'
// // // && знак 'и'

// // if (variable !== null && variable !== undefined && variable !== '') {
// //  variable2 = variable
// // } else {
// //     variable2 = 'some value'
// // }
// // // or
// // if (variable) {
// //     variable2 = variable
// //    } else {
// //        variable2 = 'some value'
// //    }
// // // or
// variable2 = variable || "some value";
// //console.log(variable2)

// //3
// // let x
// // let y
// // let z = 42
// // //or
// // let x, y, z = 42

// // 4
// let isSame = true;
// // if (isSame === true) {}
// // or
// if (isSame) {
// }

// // if (isSame !== true) {}
// // or
// if (!isSame) {
// }

// // 5
// const names = ["Igor", "Elena", "Olga"];
// // for (let i = 0, i < names.length; i++) {
// //   // names[i]
// // }
// // // or цикл 'for .. of'
// for (let name of names) {
// }
// // // or цикл 'for .. in'
// for (let index in names) {
// }

// function logArrayItems(el, index, array) {
//   console.log(`names[${index}] = ${el}`);
// }
// names.forEach(logArrayItems)

// // names.forEach(function(el, index, array) {
// //     console.log(`names[${index}] = ${el}`);
// // })

// // 6
// // let port
// // if (process.ent.PORT) {
// //     port = process.ent.PORT
// // } else {
// //     port = 4200
// // }
// // // or
// const port = process.ent.PORT || 4200

// // 7
// //for (let i = 0, i < 1000000; i++) {}
// // //or
// //for (let i = 0, i < 10E6; i++) {}

// // 8
// const a = 1, b = 2
// // or
// const myObj = {a, b}

// // 9
// // setTimeout(function() {
// //  console.log('After 2 sec')
// // }, 2000) //or
// setTimeout(() => console.log('After 2 sec'), 2000)

// // function tripple(num) {
// //     return num * 3
// // } //or
// const tripple = num => num * 3

// //
// // function rgb(r, g, b) {
// //     if (r === undefined) {
// //         r = 0
// //     }
// //     if (g === undefined) {
// //         g = 255
// //     }
// //     return `rgb(${r}, ${g}, ${b})`
// // } //or
// const rgb = (r = 0, g = 255, b) => `rgb(${r}, ${g}, ${b})`

// // 11
// // function creatUrl(base, domain) {
// //     return 'http://' + base + '.' + domain
// // } //or
// function creatUrl(base, domain) {
//         return `http://${base}.${domain}`
//     }

// 12
// const alert = window.alert
// const confirm = window.confirm
// const prompt = window.prompt
// //or
// const (alert, confirm, prompt) = window

// // 13
// const arr = [1, 2, 3]
// // const nums = [4, 5, 6].concat(arr)
// // const clones = nums.concat()
// // console.log(nums);
// // console.log(clones);
// // or оператор спред
// //const nums = [4, 5, 6, ...arr]
// //or
// //const nums = [...arr, 4, 5, 6]
// //or
// const nums = [ 4, ...arr, 5, 6]
// const clones = [...nums]
// console.log(nums);
// console.log(clones);

// // 14
// console.log(Math.floor(9.7) === 9);
// console.log(~~9.7 === 9);

// 15
// console.log(Math.pow(2, 3))
// console.log(Math.pow(2, 4))
// console.log(Math.pow(4, 3))
// //or
// console.log(2 ** 3);
// console.log(2 ** 4);
// console.log(4 ** 3);


//16
// const int = parseInt('42')
// const float = parseFloat('42.42')
// console.log(typeof int, typeof float);
// //or
// const int = +'42'
// const float = +'42.42'
// console.log(typeof int, typeof float);

// 17
// if ([1, 2, 3].indexOf(3) > -1) {}
// // or побидовый оператор ~
// if (~[1, 2, 3].indexOf(3)) {} // найдено
// if (!~[1, 2, 3].indexOf(3)) {} // не найдено

// if ([1, 2, 3].includes(3)) {} // true or false

// // 18
// const car = {
//     model: 'Ford',
//     year: 2019,
//     color: 'red'
// }
// console.log(Object.entries(car));
// console.log(Object.values(car));


