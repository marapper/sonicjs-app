var dataService = require("./data.service");
var helperService = require("./helper.service");
var emitterService = require("./emitter.service");
var globalService = require("./global.service");
// var loopback = require("loopback");
// var app = loopback();
var fs = require("fs");
const axios = require("axios");
const ShortcodeTree = require("shortcode-tree").ShortcodeTree;
const chalk = require("chalk");
var { GraphQLClient, gql, request } = require("graphql-request");
const crypto = require('crypto')
const User = require("../models/user");

var frontEndTheme = `${process.env.FRONT_END_THEME}`;
const adminTheme = `${process.env.ADMIN_THEME}`;

module.exports = userService = {
  startup: async function () {
    emitterService.on("getRenderedPagePostDataFetch", async function (options) {
      if (options) {
        options.page.data.showPageBuilder = await userService.isAuthenticated(
          options.req
        );
      }
    });
  },

  createUser: async function (username, password) {

    User.register({ username: username, active: false }, password);
    // let passwordHash = crypto.createHash('md5').update('password').digest("hex")

    // const query = gql`
    // mutation{
    //   addUser(email:"${email}", password:"${passwordHash}"){
    //     email
    //     id
    //   }
    // }
    //   `;

    // let data = await dataService.executeGraphqlQuery(query);

    // return data.contents;
  },

  

  loginUser: async function (email, password) {
    const query = gql`
      mutation{
        addUser(email:"${email}", password:"${password}"){
          email
          id
        }
      }
        `;

    let data = await dataService.executeGraphqlQuery(query);

    return data.contents;
  },

  // getUsers: async function () {
  //   var userModel = loopback.getModel("user");
  //   let users = await userModel.find();
  //   // console.log(users);
  //   return users;
  // },

  // getUser: async function (id) {
  //   var userModel = loopback.getModel("user");
  //   let user = await userModel.findById(id);
  //   return user;
  // },

  // getRoles: async function () {
  //   var roleModel = loopback.getModel("Role");
  //   let roles = await roleModel.find();
  //   // console.log(users);
  //   return roles;
  // },

  // getRole: async function (id) {
  //   var roleModel = loopback.getModel("Role");
  //   let role = await roleModel.findById(id);
  //   return role;
  // },

  // getCurrentUserId: async function (req) {
  //   if (req.signedCookies && req.signedCookies.sonicjs_access_token) {
  //     let tokenInfo = await globalService.AccessToken.findById(
  //       req.signedCookies.sonicjs_access_token
  //     );
  //     if (tokenInfo && tokenInfo.userId) {
  //       return tokenInfo.userId;
  //     }
  //   }
  // },

  // getCurrentUser: async function (req) {
  //   var userModel = loopback.getModel("user");
  //   let a = app;
  //   let userId = await userService.getCurrentUserId(req);
  //   if (userId) {
  //     let user = await userModel.findById(userId);
  //     if (user) {
  //       return user;
  //     }
  //   }
  // },

  isAuthenticated: async function (req) {
    console.log('user account', req.user);
    if(req.user.username){
      return true;
    }
    return false;
  },

  // getToken: async function (req) {
  //   return req.signedCookies.sonicjs_access_token;
  // },
};
