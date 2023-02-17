//   Quy ước tạo rules
// Nếu có lỗi ==> return 'error message'
// Không có lỗi ==> return undefined
function Validator(formSelector) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  //object dùng để chứa tất cả các rules của form
  let formRules = {};

  let varlidatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    password: function (value) {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(value)
        ? undefined
        : "Tối thiểu tám ký tự,ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số";
    },
    email: function (value) {
      let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      return regex.test(value) ? undefined : "Email không hợp lệ";
    },
    phoneNumber: function (value) {
      let regex = /^0[9|8|1|7|3|5]([0-9]|\s|-|\.){8,12}$/;
      return regex.test(value) ? undefined : "Số điện thoại không hợp lệ";
    },
    number: function (value) {
      let regex = /^[0-9]+$/;
      return regex.test(value) ? undefined : "Hãy nhập định dạng số";
    },
  };

  //lấy ra form element trong DOM theo 'formSelector'
  let formElement = document.querySelector(formSelector);
  //Chỉ xử lý khi có element trong DOM
  if (formElement) {
    let inputs = formElement.querySelectorAll("[name][rules]");
    for (let input of inputs) {
      let rules = input.getAttribute("rules").split("|");
      for (let rule of rules) {
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(varlidatorRules[rule]);
        } else {
          //vòng lặp đầu thì formRules sẽ nhảy vào điều kiện này vì nó không phải array
          formRules[input.name] = [varlidatorRules[rule]];
        }
      }
      console.log(inputs);
      // Lắng nghe sự kiện để validate (blur, change, ...)

      input.onblur = handleValidate;
      input.oninput = handleClearErrors;
    }

    //Hàm Thực hiện validate
    function handleValidate(event) {
      let rules = formRules[event.target.name];
      let errorMessage;
      for (let rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) {
          break;
        }
      }

      //Nếu có lỗi thì hiển thi message lỗi ra UI

      if (errorMessage) {
        let formGroup = getParent(event.target, ".form-group");

        if (formGroup) {
          let formInput = formGroup.querySelector(".input-box");
          formInput.classList.add("invalid");
          let formMessage = formGroup.querySelector(".from_message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }

      return !errorMessage; //validate thành công
    }
    //Hàm clear message lỗi
    function handleClearErrors(event) {
      let formGroup = getParent(event.target, ".form-group");
      let formInput = formGroup.querySelector(".input-box");
      if (formInput.classList.contains("invalid")) {
        formInput.classList.remove("invalid");
        let formMessage = formGroup.querySelector("#error");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
  }
  //Xử lý hành vi submit
  formElement.onsubmit = function (event) {
    event.preventDefault();
    let inputs = formElement.querySelectorAll("[name][rules]");
    let isValid = true;

    for (let input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }

    //Khi không có lỗi thì submit form
    if (isValid) {
      formElement.submit();
    }
  };
}

//show/hide password

const inputPassword = document.querySelector("#password");
const eyeOpen = document.querySelector(".eye-open");
const eyeClose = document.querySelector(".eye-close");

eyeOpen.addEventListener("click", function () {
  eyeOpen.classList.add("hidden");
  eyeClose.classList.remove("hidden");
  inputPassword.setAttribute("type", "password");
});
eyeClose.addEventListener("click", function () {
  eyeOpen.classList.remove("hidden");
  eyeClose.classList.add("hidden");
  inputPassword.setAttribute("type", "text");
});
