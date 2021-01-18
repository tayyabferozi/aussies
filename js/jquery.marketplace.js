import {
  Constants,
  generateErrorMarkup,
  getParam,
  isEmpty,
} from "./utils/utils.js";
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
  static BindCategory() {
    axios.get(`${Constants.defaultApiURI}categories`).then((res) => {
      const { categories } = res.data;
      let servicesMarkup = "";

      categories.forEach((category) => {
        const categoryName = category.name;
        const categoryId = category._id;
        const state = getParam("state");
        if (state == null || state == undefined) {
          state = "Australia Wide";
        }

        servicesMarkup += `<a href="index.html?category=${categoryName}&state=${state}" class="col text-center" style="background-color: white; padding: 20px; margin: 10px; box-shadow: rgba(0, 0, 0, 0.07) 5px 6px 7px 0px; color: inherit; font-size: 20px; line-height:0.5px;">
              <span>${categoryName}</span>
            </a>`;
      });

      $("#dvCategory").html(servicesMarkup);
    });
  }

  static getServiceDetails() {
    const serviceId = getParam("service");

    axios
      .get(`${Constants.defaultApiURI}services/service-details/${serviceId}`)
      .then((res) => {
        const { service } = res.data;
        let thumbnail;
        const name = service.name;
        const description = service.description;
        const price = service.price;
        const sellerName = service.sellerId.name;
        const sellerEmail = service.sellerId.email;
        const sellerPhone = service.sellerId.phone;
        // const sellerWebsite = service.sellerId.website;
        const sellerWebsite = "Website here";
        const categoryName = service.categoryId.name;
        const state = service.state;

        if (!isEmpty(service.packages)) {
          // let packageMarkup = `
          // <div class="row p-3 mb-2 item-single-package">
          //   <div class="col my-auto p-0">
          //     <div class="form-group d-flex mb-0">
          //       <input
          //         type="radio"
          //         name="radioPrice"
          //         id="price1"
          //         class="my-auto"
          //       />
          //       <label for="price1">
          //         Oven Cleaning<br />
          //         <span class="text-grey">One Oven</span>
          //       </label>
          //     </div>
          //   </div>
          //   <div class="col-auto p-0 desc">
          //     <h5 class="d-block mb-0">$65</h5>
          //     <span class="d-block text-uppercase text-grey">Valued at $135</span>
          //     <span class="d-block text-success text-uppercase">Save 52% off</span>
          //   </div>
          // </div>
          // `;

          service.packages.forEach((el) => {
            let packageMarkup = ` 
            <div class="row p-3 mb-2 item-single-package">
              <div class="col my-auto p-0">
                <div class="form-group d-flex mb-0">
                  <input
                    type="radio"
                    name="radioPrice"
                    id="${el.name}"
                    class="my-auto"
                  />
                  <label for="${el.name}">
                    <div>${el.name}</div>
                    <div class="text-grey mt-1">${el.description}</div>
                  </label>
                </div>
              </div>
              <div class="col-auto p-0 desc">
                <h5 class="d-block mb-0">$${el.price}</h5>
                <span class="d-block text-uppercase text-grey">Valued at $135</span>
                <span class="d-block text-success text-uppercase">Save 52% off</span>
              </div>
            </div>
            `;

            $("#item-packages-container").append(packageMarkup);
          });
        }

        if (!isEmpty(service.thumbnails)) {
          // thumbnail =
          //   Constants.defaultImageURI + service.thumbnails[0].filename;
          let carouselStartMarkup = `
          <div id="thumbnailCarousel" class="carousel slide" data-ride="carousel">
           <ol class="carousel-indicators">
          `;

          let carouselIndicatorsMainMarkup = "";
          let carouselInnerStartMarkup = `
          </ol>
          <div class="carousel-inner">
          `;
          let carouselInnerMarkup = "";
          let carouselEndMarkup = `
          </div>
            <a class="carousel-control-prev" href="#thumbnailCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#thumbnailCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          `;

          service.thumbnails.forEach((el, idx) => {
            carouselIndicatorsMainMarkup += `
            <li data-target="#thumbnailCarousel" data-slide-to="${idx}" class="${
              idx === 0 ? "active" : ""
            }"></li>
            `;
            carouselInnerMarkup += `
            <div class="carousel-item ${idx === 0 ? "active" : ""}">
              <img
                class="d-block w-100"
                src="${Constants.defaultImageURI + el.filename}"
                alt="First slide"
              />
            </div>
            `;
          });

          $("#imgThumbnail").html(
            carouselStartMarkup +
              carouselIndicatorsMainMarkup +
              carouselInnerStartMarkup +
              carouselInnerMarkup +
              carouselEndMarkup
          );
        } else {
          $("#imgThumbnail").html(
            "<h2 class='text-center'>No thumbnails to show</h2>"
          );
        };

        if(!isEmpty(service.tags)){
          service.tags.forEach((el) => {
            let tagsMarkup = `<li><a href="#">`+el+`</a></li>`;
            $("#ulServiceTags").append(tagsMarkup);
          });
        }
        
        $("#lblServiceName").html(name);

        $("#olServiceBreadcrumb").append(`<li class="breadcrumb-item active" aria-current="page">`+name+`</li>`);

        $("#dvServiceDescription").html(description);

        $("#lblServicePrice").html("$" + price);

        $("#lblSellerName").html(sellerName);

        $("#lblSellerEmail").html(sellerEmail);

        $("#lblSellerPhone").html(sellerPhone);

        $("#lblSellerWebsite").html(sellerWebsite);

        $("#lblServicePriceAgain").html("$" + price);

        $("#lblState").html(state);

        $("#seller-href").attr(
          "href",
          `index.html?seller=${service.sellerId._id}`
        );

        $("#lblServiceCategory").html(categoryName);


        document.title = "Aussies Marketplace - " + name;
      })
      .catch((err) => {
        let errorMessage;
        if (err.response) {
          console.log(err.response.data.errors[0]);
          errorMessage = err.response.data.errors[0];
        } else {
          console.log(err.message);
          errorMessage = err.message;
        }

        $("#imgThumbnail").html(generateErrorMarkup(errorMessage));

        $("#dvServiceDescription").empty();

        $("#lblServicePrice").empty();

        $("#lblSellerName").empty();

        $("#lblSellerEmail").empty();

        $("#lblSellerPhone").empty();
      });
  }
}
