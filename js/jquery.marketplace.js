import { Constants, getParam, isEmpty } from "./utils/utils.js";
// "use strict";

// if (!String.prototype.includes) {
//   String.prototype.includes = function (search, start) {
//     "use strict";

//     if (search instanceof RegExp) {
//       throw TypeError("first argument must not be a RegExp");
//     }
//     if (start === undefined) {
//       start = 0;
//     }
//     return this.indexOf(search, start) !== -1;
//   };
// }

// function UserJS() {
//   const params = new URLSearchParams(window.location.search);
//   this.GetServiceList = function () {
//     $.ajax({
//       type: "POST",
//       url: "/api/getserviceslist",
//       data: JSON.stringify({
//         CategoryID: null,
//         SubCategoryID: null,
//         StateID: null,
//         SellerID: params.get("Seller"),
//         HideYN: "0",
//         PageIndex: $("#PageIndex").val(),
//       }),
//       contentType: "application/json; charset=utf-8",
//       headers: {
//         Authorization:
//           "Basic " +
//           btoa(
//             sessionStorage.getItem("username") +
//               ":" +
//               sessionStorage.getItem("password")
//           ),
//       },
//       success: function (response) {
//         var res = JSON.parse(response);
//         var c = "";
//         $.each(res, function (key, value) {
//           c =
//             c +
//             `
//                             <div class="col-lg-4 col-md-6">
//                                 <div class="single-product t-single-product mb-30">
//                                     <div class="product-img">
//                                         <a href="product-details.html?Service=` +
//             value.ServiceID +
//             `"><img src="` +
//             value.ThumbnailImageURL +
//             `" alt="img"></a>
//                                     </div>
//                                     <div class="t-product-overlay" style="position:relative;">
//                                         <h5><a href="product-details.html?Service=` +
//             value.ServiceID +
//             `">` +
//             value.Name +
//             `</a></h5>
//                                         <span>` +
//             value.CategoryName +
//             `/` +
//             value.SubCategoryName +
//             `</span>
//                                         <!--<p>14 Sales</p>-->
//                                         <div class="t-product-meta">
//                                             <div class="t-product-rating">
//                                                 <!--<i class="far fa-star"></i>
//                                                 <i class="far fa-star"></i>
//                                                 <i class="far fa-star"></i>
//                                                 <i class="far fa-star"></i>
//                                                 <i class="far fa-star"></i>-->
//                                                 <a href="product-details.html?Service=` +
//             value.ServiceID +
//             `">More Details</a>
//                                             </div>
//                                             <h6>$` +
//             value.Price +
//             `</h6>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>`;
//         });
//         $("#dvProduct").html(c);

//         c =
//           `<li class="page-item"><a href="#" onclick="UsrCtrl.NextPage('` +
//           parseInt($("#PageIndex").val() - 1) +
//           `');"><i class="fas fa-chevron-left"></i></a></li>`;
//         var index = 1;
//         $.each(value.Pages, function () {
//           if ($("#PageIndex").val() == index) {
//             c +=
//               `<li class="page-item"><a href="#" onclick="UsrCtrl.NextPage('` +
//               index +
//               `');">` +
//               index +
//               `</a></li>`;
//           } else {
//             c +=
//               `<li class="page-item active"><a href="#" onclick="UsrCtrl.NextPage('` +
//               index +
//               `');">` +
//               index +
//               `</a></li>`;
//           }
//           index++;
//         });
//         c +=
//           `<li class="page-item"><a href="#" onclick="UsrCtrl.NextPage('` +
//           parseInt($("#PageIndex").val() + 1) +
//           `');"><i class="fas fa-chevron-right"></i></a></li>`;
//         $("#ulPagination").html(c);
//       },
//       error: function (req, status, err) {
//         alert(err.toString());
//       },
//     });
//   };
//   this.NextPage = function (index) {
//     $("#PageIndex").val(index);
//     this.GetServiceList();
//   };
//   this.GetServiceDetails = function () {
//     $.ajax({
//       type: "GET",
//       url: "/api/getservice/" + params.get("Service"),
//       success: function (response) {
//         var res = JSON.parse(response);
//         $("#CompanyID").val(res.CompanyID);
//         $("#lblSellerName").text(res.SellerName);
//         $("#lblSellerEmail").text(res.SellerEmail);
//         $("#lblSellerPhone").text(res.SellerPhone);
//         $("#olServiceCategory").html(
//           `
//                         <li class="breadcrumb-item"><a href="#">` +
//             res.CategoryName +
//             `</a></li>
//                         <li class="breadcrumb-item active" aria-current="page">` +
//             res.SubCategoryName +
//             `</li>`
//         );
//         $("#lblServiceCategory").text(
//           res.CategoryName + "/" + res.SubCategoryName
//         );
//         $("#lblServiceState").text(res.StateName);
//         $("#lblServiceName").text(res.Name);
//         $("#dvServiceDescription").html(res.Description);
//         $("#lblServicePrice").text(res.Price);
//         $("#imgThumbnail").attr("src", res.ThumbnailImageURL);
//         UserCtrl.BindSupportCategory();
//       },
//       error: function (req, status, err) {
//         alert(err.toString());
//       },
//     });
//   };
//   this.BindSupportCategory = function () {
//     $.ajax({
//       type: "GET",
//       url:
//         "https://ticketingapi.webnapp.com.au/api/company/getsupportcategory/" +
//         $("#CompanyID").val(),
//       success: function (response) {
//         var res = JSON.parse(response);
//         var c = "";
//         $.each(res, function (key, value) {
//           c =
//             c +
//             `<option value=` +
//             value.SupportCategoryID +
//             `>` +
//             value.Name +
//             `</option>`;
//         });
//         $("#ddlSupportCategory").html(c);
//       },
//       error: function (req, status, err) {
//         alert(err.toString());
//       },
//     });
//   };
//   this.CreateSupport = function () {
//     if (
//       $("#Name").val() != "" &&
//       $("#Email").val() != "" &&
//       $("#Phone").val() != "" &&
//       $("#ddlSupportCategory").val() != "" &&
//       $("#Message").val() != "" &&
//       $("#CompanyID").val() != ""
//     ) {
//       $.ajax({
//         type: "POST",
//         url:
//           "https://ticketingapi.webnapp.com.au/api/company/createcompanysupport",
//         data: JSON.stringify({
//           SupportCategoryID: $("#ddlSupportCategory").val(),
//           Name: $("#Name").val(),
//           Email: $("#Email").val(),
//           Phone: $("#Phone").val(),
//           CompanyID: $("#CompanyID").val(),
//         }),
//         contentType: "application/json; charset=utf-8",
//         success: function (response) {
//           var res = JSON.parse(response);
//           if (parseInt(res.SupportID) > 0) {
//             $.ajax({
//               type: "POST",
//               url:
//                 "https://ticketingapi.webnapp.com.au/api/company/addsupportcommunication",
//               data: JSON.stringify({
//                 SupportID: parseInt(res.SupportID),
//                 Message: $("#Message").val(),
//                 AdminYN: false,
//               }),
//               contentType: "application/json; charset=utf-8",
//               success: function (response) {
//                 var res = JSON.parse(response);
//                 if (parseInt(res.SupportCommunicationID) > 0) {
//                   alert(
//                     "Thank you for reaching out to us. We'll get back to you soon."
//                   );
//                 } else {
//                   alert("Error");
//                 }
//               },
//               error: function (req, status, err) {
//                 alert(err.toString());
//               },
//             });
//           } else {
//             alert("Error");
//           }
//         },
//         error: function (req, status, err) {
//           alert(err.toString());
//         },
//       });
//     } else {
//       alert("Please fill the required fields.");
//     }
//     return false;
//   };
// }
// var UserCtrl = new UserJS();

// toastr.options = {
//   closeButton: true,
//   debug: false,
//   newestOnTop: false,
//   progressBar: true,
//   positionClass: "toast-bottom-full-width",
//   preventDuplicates: false,
//   onclick: null,
//   showDuration: "300",
//   hideDuration: "1000",
//   timeOut: "5000",
//   extendedTimeOut: "1000",
//   showEasing: "swing",
//   hideEasing: "linear",
//   showMethod: "fadeIn",
//   hideMethod: "fadeOut",
// };

// function success(msg) {
//   toastr["success"](msg);
// }

// function error(msg) {
//   toastr["error"](msg);
// }

// function warning(msg) {
//   toastr["warning"](msg);
// }

// function info(msg) {
//   toastr["info"](msg);
// }

// function getBase64(file, onLoadCallback) {
//   return new Promise(function (resolve, reject) {
//     var reader = new FileReader();
//     reader.onload = function () {
//       resolve(reader.result);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

export class UserCtrl {
  static getAllServices() {
    axios
      .get(`${Constants.defaultApiURI}/services/active-services`)
      .then((res) => {
        const { services } = res.data;
        let servicesMarkup = "";

        services.forEach((service) => {
          let heroThumbnail;
          const serviceName = service.name;
          const servicePrice = service.price;
          const serviceCategory = service.category;
          const serviceSubCategory = service.subCategory;
          const serviceId = service._id;
          if (!isEmpty(service.thumbnails)) {
            heroThumbnail =
              Constants.defaultImageURI + service.thumbnails[0].filename;
          }

          servicesMarkup += `
        <div class="col-lg-4 col-md-6">
          <div class="single-product t-single-product mb-30">
              <div class="product-img">
                <a href="product-details.html?service=${serviceId}"><img src="${heroThumbnail}" alt="img"></a>
              </div>
              <div class="t-product-overlay" style="position:relative;">
                <h5><a href="product-details.html?servie=${serviceId}">${serviceName}</a></h5>
                <span>${serviceCategory}/${serviceSubCategory}</span>
                <!--<p>14 Sales</p>-->
                <div class="t-product-meta">
                  <div class="t-product-rating">
                    <!--<i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>-->
                    <a href="product-details.html?servie=${serviceId}">More Details</a>
                  </div>
                  <h6>$${servicePrice}</h6>
                </div>
              </div>
          </div>
        </div>`;
        });

        $("#dvProduct").html(servicesMarkup);
      });
  }

  static getServiceDetails() {
    const serviceId = getParam("service");

    axios
      .get(`${Constants.defaultApiURI}/services/service-details/${serviceId}`)
      .then((res) => {
        const service = res.data.service;
        let thumbnail;
        const description = service.description;
        const price = service.price;
        const sellerName = service.sellerId.name;
        const sellerEmail = service.sellerId.email;
        const sellerPhone = service.sellerId.phone;

        if (!isEmpty(service.thumbnails)) {
          thumbnail =
            Constants.defaultImageURI + service.thumbnails[0].filename;
        }

        $("#imgThumbnail").html(`
        <img src="${thumbnail}">
        `);

        $("#dvServiceDescription").html(description);

        $("#lblServicePrice").html("$" + price);

        $("#lblSellerName").html(sellerName);

        $("#lblSellerEmail").html(sellerEmail);

        $("#lblSellerPhone").html(sellerPhone);
      });
  }
}
