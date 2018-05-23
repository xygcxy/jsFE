// function fn(){
// 	var args = [].slice.call(arguments);
// 	var i = 0;
// 	var promise = new Promise(resolve => {
//         console.log(args[i++]);
// 		resolve(i)
// 	})
// 	// while(i < args.length) {
//     //     console.log(i);
//         promise = promise.then(() => 
//             setTimeout(()=>{
//                 console.log(args[i]);
//                 i++;
//             }, 1000)  
//         )
//         if (i < args.length) {
//             promise = promise.then(() => 
//                 setTimeout(()=>{
//                     console.log(args[i]);
//                     i++;
//                 }, 1000)  
//             )  
//         }
        
//     // }
// }
// fn(1,2,3)