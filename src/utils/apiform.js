// export const getFormBody = (params) => {
//     let formBody = [];

//     for (let property in params) {
//       let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
//       let encodedValue = (params[property]); // aakash 123 => aakash%2020123
//       formBody.push(encodedKey + '=' + encodedValue);
//     }

//     return formBody.join('&'); // 'username=aakash&password=123213'
//   };
export const getFormBody = (params) => {
  const formdata = new FormData();
  for (let property in params) {
    formdata.append(property, params[property]);
  }

  return formdata;
};
