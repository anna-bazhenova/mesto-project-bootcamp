(()=>{"use strict";var e,t=function(e,t){document.querySelector("#error-".concat(e.id)).textContent="",e.classList.remove(t.inputErrorClass)},n=function(e,t){document.querySelector("#error-".concat(e.id)).textContent=e.validationMessage,e.classList.add(t.inputErrorClass)},o=function(e,t){var n=e.querySelector(t.submitButtonSelector);e.checkValidity()?(n.disabled=!1,n.classList.remove(t.inactiveButtonClass)):(n.disabled=!0,n.classList.add(t.inactiveButtonClass))},r=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",a)},c=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",a)},a=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");c(t)}},i={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-6",headers:{authorization:"06dd5fb3-5e2f-4d1c-9ed0-e0e8756ddf10","Content-Type":"application/json"}},u=function(e){return e.ok?e.json():(console.dir(e.json()),Promise.reject("Ошибка: ".concat(e.status)))},l=document.querySelector("#cardTemplate").content.querySelector(".element"),s=document.querySelector(".popup-image"),d=document.querySelector(".popup-image__image"),m=document.querySelector(".popup-image__caption"),f=document.querySelector(".popup_confirmation"),p=f.querySelector(".form__submit-button"),h=function(e,t){var n=l.cloneNode(!0),o=n.querySelector(".element__image"),a=n.querySelector(".element__place-name"),h=n.querySelector(".element__like-button"),_=n.querySelector(".element__delete-button"),v=n.querySelector(".element__number-likes");return o.src=e.link,o.alt=e.name,a.textContent=e.name,v.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&h.classList.add("element__like-button_active"),h.addEventListener("click",(function(){var t;h.classList.contains("element__like-button_active")?(t=e._id,fetch("".concat(i.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:i.headers}).then(u)).then((function(e){h.classList.toggle("element__like-button_active"),v.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then(u)}(e._id).then((function(e){h.classList.toggle("element__like-button_active"),v.textContent=e.likes.length})).catch((function(e){console.log(e)}))})),e.owner._id===t?_.addEventListener("click",(function(){r(f),p.addEventListener("click",(function(t){var o;t.preventDefault(),(o=e._id,fetch("".concat(i.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:i.headers}).then(u)).then((function(){n.remove(),c(f)})).catch((function(e){console.log(e)}))}),{once:!0})})):_.remove(),o.addEventListener("click",(function(){d.src=o.src,d.alt=a.textContent,m.textContent=a.textContent,r(s)})),n},_=function(e,t,n){t.textContent=e?"Сохранение...":n},v=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_edit-form"),b=document.querySelector(".profile__name"),S=document.querySelector(".profile__profession"),C=document.querySelector(".profile__avatar"),g=document.querySelector(".profile__avatar-container"),q=document.querySelector(".popup_change-avatar"),k=document.forms.changeAvatar.linkAvatar,E=document.forms.changeAvatar,L=document.forms.editProfile.nameProfile,x=document.forms.editProfile.professionProfile,P=document.forms.editProfile,A=document.querySelector(".elements"),U=document.querySelector(".profile__add-button"),T=document.querySelector(".popup_add-cards"),D=document.forms.addCard,B=document.forms.addCard.nameCard,j=document.forms.addCard.linkCard,w=document.querySelectorAll(".close-button"),N=document.querySelectorAll(".popup"),O=document.forms.addCard.querySelector(".form__submit-button"),J=document.forms.editProfile.querySelector(".form__submit-button"),H=document.forms.changeAvatar.querySelector(".form__submit-button"),z={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_inactive",inputErrorClass:"form__input_invalid",errorClass:"error-message"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(r){r.querySelectorAll(e.inputSelector).forEach((function(c){c.addEventListener("input",(function(){!function(e,r,c){r.validity.valid?t(r,c):n(r,c),o(e,c)}(r,c,e)}))}))}))}(z),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then(u).then((function(t){t.forEach((function(t){return A.append(h(t,e))}))})).catch((function(e){console.log(e)})),U.addEventListener("click",(function(){o(D,z),r(T)})),D.addEventListener("submit",(function(t){t.preventDefault();var n,o=O.textContent;_(!0,O),(n={name:B.value,link:j.value},fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(u)).then((function(n){A.prepend(h(n,e)),c(T),t.target.reset()})).catch((function(e){console.log(e)})).finally((function(){_(!1,O,o)}))})),g.addEventListener("click",(function(){o(E,z),r(q)})),E.addEventListener("submit",(function(e){e.preventDefault();var t,n=H.textContent;_(!0,H),(t=k.value,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:t})}).then(u)).then((function(t){C.src=t.avatar,c(q),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){_(!1,H,n)}))})),fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then(u).then((function(t){b.textContent=t.name,S.textContent=t.about,C.src=t.avatar,e=t._id})).catch((function(e){console.log(e)})),v.addEventListener("click",(function(){L.value=b.textContent,x.value=S.textContent,o(P,z),r(y)})),P.addEventListener("submit",(function(e){e.preventDefault();var t=J.textContent;_(!0,J),function(e,t){return fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:e,about:t})}).then(u)}(L.value,x.value).then((function(e){b.textContent=e.name,S.textContent=e.about,c(y)})).catch((function(e){console.log(e)})).finally((function(){_(!1,J,t)}))})),w.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return c(t)}))})),N.forEach((function(e){e.addEventListener("click",(function(t){t.target===t.currentTarget&&c(e)}))}))})();