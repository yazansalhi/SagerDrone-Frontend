<template>
<div class="container">
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item-dropdown :text="'Welcome! '+$store.state.name" right>
        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
           <b-nav-item-dropdown text="Create" right>
        <b-dropdown-item  v-b-modal.modal-prevent-closing>User</b-dropdown-item>
      

        <b-dropdown-item v-b-modal.modal-prevent-product>Product</b-dropdown-item>
       <b-dropdown-item v-b-modal.modal-prevent-category>Category</b-dropdown-item>

      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>
<div>
      <b-alert show variant="danger" v-if="errorMsg">{{errorMsg}}</b-alert>

  <b-tabs content-class="mt-3">
    <b-tab title="Users" active>
            <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">email</th>
          
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,i) in users" :key="i">
             <td>{{user.name}}</td>
              <td>{{user.email}}</td>
         
            
            <td class="row">
              <button  type="button" class="btn btn-success col-4"><i class="fas fa-edit"></i></button>
            <button @click="removeItem(user.id,'users')"  type="button" class="btn btn-danger col-4"><i class="far fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-tab>
    <b-tab title="Products">
        <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
              <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                 <th scope="col">Image</th>
                <th scope="col">Create User Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,i) in products" :key="i">
             <td>{{product.name}}</td>
              <td>{{product.description}}</td>
               <td>{{product.quantity}}</td>
                <td>{{product.price}}</td>
                 <td>{{product.image}}</td>
                   <td>{{product.create_user_id}}</td>
            
            <td class="row">
              <button  type="button" class="btn btn-success col-4"><i class="fas fa-edit"></i></button>
            <button @click="removeItem(product.id,'products')" type="button" class="btn btn-danger col-4"><i class="far fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-tab>
    <b-tab title="Categories"><table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Products</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category,i) in categories" :key="i">
             <td>{{category.name}}</td>
               <td class="row"><span class="col-6" v-for="(product,i) in category.products" :key="i">
                  {{i+1}} - {{product.name}}
                   </span></td>
            <td class="row">
              <button  type="button" class="btn btn-success col-1 ml-5"><i class="fas fa-edit"></i></button>
            <button @click="removeItem(category.id,'categories')" type="button" class="btn btn-danger col-1"><i class="far fa-trash-alt"></i></button>
            </td>
          </tr>
        </tbody>
      </table></b-tab>
  </b-tabs>
</div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create User"
      hide-footer
    >
   <form @submit.prevent="createUser">

                         <ul v-for="(error, key) in errors" :key="key">
                    <li class="alert alert-danger" v-text="error[0]" ></li>   
                    </ul>

              <div height="16px"></div>
              <div class="contain-input">
                <label for="name">Name</label>
                  <span class="error-text" v-if="!$v.name.required">
                                                    *
                                                 </span>
                <div>
                  <input type="text" id="name" name="name" v-model="name" />
                </div>
              </div>
              <div class="contain-input">
                <label for="email">Email</label>
                    <span class="error-text" v-if="!$v.email.required || !$v.email.email">
                                                    *
                                                 </span>
                <div>
                  <input type="email" id="email" v-model="email" name="email"  />
                     <span class="error-text" v-if="!$v.email.required || !$v.email.email">
                                <strong class="error-invalid" v-if="email">
                                  please enter a valid email address 
                                </strong>
                            </span>
                </div>
              </div>
          
              <div>
                <label for="password">Create a Password</label>
                 <span class="error-text" v-if="!$v.password.required || !$v.password.minLen || !$v.password.valid">
                                                    *
                                                 </span>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                  />
                     <span class="error-text" v-if="!$v.password.minLen || !$v.password.valid">
                                <strong class="error-invalid" v-if="password">
                                   min char is  {{$v.password.$params.minLen.min}} and it should  atleast contain 1 letter uppercase and number
                                </strong>
                            </span>
                </div>
              </div>
        
  
              <div>
              </div>
     <button type="submit" :disabled="$v.$invalid" >Create</button>
           
            </form>

    </b-modal>


       <b-modal
      id="modal-prevent-product"
      ref="modal"
      title="Create Product"
      hide-footer
    >
   <form @submit.prevent="createProduct">

                         <ul v-for="(error, key) in errors" :key="key">
                    <li class="alert alert-danger" v-text="error[0]" ></li>   
                    </ul>

              <div height="16px"></div>
              <div class="contain-input">
                        <b-alert show variant="danger" v-if="errorcreate">{{errorcreate}}</b-alert>

                <label for="name">Product Name</label>
                  <span class="error-text" v-if="!$v.productName.required">
                                                    *
                                                 </span>
                <div>
                  <input type="text" id="name" name="name" v-model="productName" />
                </div>
              </div>
             <div class="form-group">
            
  <div>
  <label class="typo__label">Select Category</label>
  <multiselect v-model="items"    @input="updateApprovers" :options="categories" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
    <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
  </multiselect>

</div>
                </div>
          
              <div>
              </div>
     <button type="submit"  >Create</button>
           
            </form>

    </b-modal>

           <b-modal
      id="modal-prevent-category"
      ref="modal"
      title="Create Category"
      hide-footer
    >
   <form @submit.prevent="createCategory">

                         <ul v-for="(error, key) in errors" :key="key">
                    <li class="alert alert-danger" v-text="error[0]" ></li>   
                    </ul>

              <div height="16px"></div>
              <div class="contain-input">
                        <b-alert show variant="danger" v-if="errorcreate">{{errorcreate}}</b-alert>

                <label for="name">Category Name</label>
                  <span class="error-text" v-if="!$v.categoryName.required">
                                                    *
                                                 </span>
                <div>
                  <input type="text" id="name" name="name" v-model="categoryName" />
                </div>
              </div>
             <div class="form-group">
            
                </div>
          
              <div>
              </div>
     <button type="submit"  >Create</button>
           
            </form>

    </b-modal>
</div>
</template>

<script>
import router from '@/router'
  import {required, email, minLength, sameAs, maxLength} from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

  export default {
        components: { Multiselect },
    data() {
      return {
        fields: ['name', 'email'],
        users: [],
        products:[],
        categories:[],
        errorMsg:null,
        items:[],
        errors:[],
         name:null,
            email: null,
            password: null,
        productName:null,
       categoryIds:[],
  errorcreate:null,
  categoryName:null
      }
    },
      validations: {
           productName:{
              required,
                
         },
            categoryName:{
              required,
                
         },
         name:{
              required,
                
         },
            email: {
                required,
                email
            },
            password: {
                required,
                minLen: minLength(8),
               valid: function(value) {
                const containsUppercase = /[A-Z]/.test(value)
                const containsNumber = /[0-9]/.test(value)
                  return containsUppercase && containsNumber
               }

            }
        },
    methods: {
  
      logout(){
          localStorage.removeItem('token');
          this.$store.commit('clearAuth');
              router.push({
              path: "/login",
            });
      },
      getUsers(){
      let vm = this
      vm.$store.dispatch("getUsers").then(
        (response) => {
          vm.users = response
        },
        (error) => {
          console.log(error)
        }
      );
      },
         getProducts(){
      let vm = this
      vm.$store.dispatch("getProducts").then(
        (response) => {
            vm.products = response
        },
        (error) => {
          console.log(error)
        }
      );
      },
          getCategories(){
      let vm = this
      vm.$store.dispatch("getCategories").then(
        (response) => {
            vm.categories = response
          
        },
        (error) => {
          console.log(error)
        }
      );
      },
      removeItem(id,dispatchUrl){
     let vm = this
  const formData = {
        id,
        dispatchUrl
      };
      vm.$store.dispatch("removeItem",formData).then(
        (response) => {
            if(dispatchUrl == 'users'){
                    vm.getUsers();
            }else if(dispatchUrl == 'products'){
                vm.getProducts();
           
            }
            else if(dispatchUrl == 'categories'){
                vm.getCategories();
            }
       
        },
        (error) => {
          vm.errorMsg = error.error
        setTimeout(()=>{
            vm.errorMsg = null
        },3000)
        }
      );
      },

       createUser(){
     let vm = this
  const formData = {
       name:vm.name,
       email:vm.email,
       password:vm.password
      };
      vm.$store.dispatch("createUser",formData).then(
        (response) => {
      vm.$bvModal.hide('modal-prevent-closing')
                    vm.getUsers();
           
       
        },
        (error) => {
          vm.errors = error.errors
        setTimeout(()=>{
            vm.errorMsg = null
        },3000)
        }
      );
      },

       createProduct(){
     let vm = this
  const formData = {
       name:vm.productName,
       category_ids:vm.categoryIds,
      };
      vm.$store.dispatch("createProduct",formData).then(
        (response) => {
      vm.$bvModal.hide('modal-prevent-product')
                    vm.getProducts();
        
        },
        (error) => {
            console.log(error)
               vm.errorcreate = error.error
        setTimeout(()=>{
            vm.errorMsg = null
        },3000)
        }
      );
      },
           createCategory(){
     let vm = this
  const formData = {
       name:vm.categoryName,
      };
      vm.$store.dispatch("createCategory",formData).then(
        (response) => {
      vm.$bvModal.hide('modal-prevent-category')
                    vm.getCategories();
        
        },
        (error) => {
       
               vm.errorcreate = error.error
        setTimeout(()=>{
            vm.errorMsg = null
        },3000)
        }
      );
      },
      updateApprovers(items) {
                let approvers = [];

                items.forEach((item) => {
                     approvers.push(item.id);
                });

                this.categoryIds = approvers;
            },
    },
    mounted(){
        this.getUsers();
         this.getProducts();
          this.getCategories();
    }
  }
</script>
<style scoped>
.error-invalid{
  font-size: 12px;
}
.error-text{
    color: #ce4854;
}
input:invalid {
    border: 1px solid #ce4854;
    box-shadow: none;
}

.right {
  width: 33.33333333333333%;
  height: 100%;
  min-height: auto;
  right: 0;
  background: gray;
}
.bg {
  background: gray;
}
.logo {
  margin-top: 24px;
}
.left {
  width: 66.66666666666666%;
  background-color: none;
  height: 100%;
  min-height: auto;
}
.left-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0px auto;
  overflow-y: auto;
  max-width: 100%;
  background-color: #ffffff;
}
.contain-logo {
  text-align: left;
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.login {
  text-align: left;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  width: 100%;
  -webkit-align-items: left;
  -webkit-box-align: left;
  -ms-flex-align: left;
  align-items: left;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  background-color: #ffffff;
  background-image: none;
}
h1 {
  font-style: normal;
  font-weight: bold;
  line-height: 44px;
  font-size: 32px;
  margin-bottom: 8px;
  color: #3d3d3d;
}
.contain-form {
  max-width: 480px;
  width: 100%;
  margin: auto;
}
.contain-input {
  margin-bottom: 8px;
}
.form {
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.spaces {
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.terms {
  width: 100%;
  font-size: normal;
  font-weight: 500;
  font-size: 14px;
  margin: 16px 0px;
  color: #636363;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.link {
  color: #3d3d3d;
  -webkit-text-decoration: none;
  text-decoration: none;
}
.link-term {
  color: #2c4bff;
  -webkit-text-decoration: none;
  text-decoration: none;
  cursor: pointer;
  font-size: normal;
  font-weight: 500;
  font-size: 14px;
}
label {
  font-weight: 500;
  font-size: 14px;
  color: #3d3d3d;
  text-align: left;
  margin-bottom: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input {
  width: 100%;
  background-color: #ffffff;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  margin: 8px 0px;
  border: 1px solid #b8b8b8;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  -webkit-transition-property: border-width, border-color, box-shadow;
  transition-property: border-width, border-color, box-shadow;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  box-shadow: 2px 2px 0 2px transparent;
  text-overflow: ellipsis;
  overflow: hidden;
}
button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0;
  -webkit-appearance: none;
  position: relative;
  -webkit-transition-property: background-color, border-color, color;
  transition-property: background-color, border-color, color;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  min-width: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  background-color: #E0E0E0;

    color: #636363;
  padding-right: 16px;
  padding-left: 16px;
  margin: 8px 0px;
  height: 48px;

}
.forget {
  width: 100%;
  font-size: normal;
  font-weight: 500;
  font-size: 14px;
  margin: 16px 0px;
  color: #636363;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.note {
  padding: 2rem 0;
  text-align: center;
}
.note p {
  font-weight: initial;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 14px;
  color: #636363;
}
.intro {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  color: #ffffff;
}
a span {
  margin: 0 10px;
}
.right-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0px auto;
  overflow-y: auto;
  max-width: 100%;
  background-color: #f5f5f5;
}
.right-info {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(https://static.buffer.com/login/public/img/signup-bkg-publish.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
}
.right-info img {
  width: 80px;
  height: 80px;
  margin: 8px 0px;
}
.name {
  letter-spacing: -0.75px;
  line-height: 16px;
  font-size: 16px;
  margin-bottom: 10px;
}
.position {
  font-weight: 500;
  line-height: 16px;
  font-size: 14px;
  margin-bottom: 10px;
}
.description {
  font-weight: 500;
  line-height: 16px;
  font-size: 14px;
  margin-bottom: 10px;
}
.info {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  color: #ffffff;
}
.quote {
  line-height: 32px;
  font-size: 24px;
  margin-bottom: 16px;
  -webkit-letter-spacing: -0.75px;
  -moz-letter-spacing: -0.75px;
  -ms-letter-spacing: -0.75px;
  letter-spacing: -0.75px;
  color: #ffffff;
}

@media (max-width: 1250px) {
  .right {
    display: none;
  }
  .left {
    width: 100%;
  }
}
@media only screen and (max-width: 420px) {
  .spaces {
    padding: 0px 24px;
  }
  .spaces:first-child {
    margin-top: 0px;
  }
  h1 {
    font-size: 24px;
  }
  .forget  {
    font-size: 11px;
  }
.link-term {
    font-size: 11px;
  }
}
</style>