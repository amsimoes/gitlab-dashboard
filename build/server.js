require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _typeof2 = __webpack_require__(1);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _toConsumableArray2 = __webpack_require__(3);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _extends2 = __webpack_require__(4);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _set = __webpack_require__(5);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(7);
  
  var _path = __webpack_require__(8);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(9);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(10);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(11);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(12);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(13);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(14);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(16);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(17);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(18);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _App = __webpack_require__(19);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Html = __webpack_require__(25);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(27);
  
  var _ErrorPage2 = __webpack_require__(29);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _passport = __webpack_require__(37);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _models = __webpack_require__(40);
  
  var _models2 = _interopRequireDefault(_models);
  
  var _schema = __webpack_require__(47);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(61);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(122);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var _ret;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, context, route, data, html;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = new _set2.default();
  
                        // Global (context) variables that can be easily accessed from any React component
                        // https://facebook.github.io/react/docs/context.html
  
                        context = {
                          // Enables critical path CSS rendering
                          // https://github.com/kriasoft/isomorphic-style-loader
                          insertCss: function insertCss() {
                            for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                              styles[_key] = arguments[_key];
                            }
  
                            // eslint-disable-next-line no-underscore-dangle
                            styles.forEach(function (style) {
                              return css.add(style._getCss());
                            });
                          }
                        };
                        _context.next = 4;
                        return _universalRouter2.default.resolve(_routes2.default, {
                          path: req.path,
                          query: req.query
                        });
  
                      case 4:
                        route = _context.sent;
  
                        if (!route.redirect) {
                          _context.next = 8;
                          break;
                        }
  
                        res.redirect(route.status || 302, route.redirect);
                        return _context.abrupt('return', {
                          v: void 0
                        });
  
                      case 8:
                        data = (0, _extends3.default)({}, route);
  
                        data.children = _server2.default.renderToString(_react2.default.createElement(
                          _App2.default,
                          { context: context },
                          route.component
                        ));
                        data.style = [].concat((0, _toConsumableArray3.default)(css)).join('');
                        data.script = _assets2.default.main.js;
                        html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, data));
  
  
                        res.status(route.status || 200);
                        res.send('<!doctype html>' + html);
  
                      case 15:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _ret = _context2.t0;
  
              if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                _context2.next = 5;
                break;
              }
  
              return _context2.abrupt('return', _ret.v);
  
            case 5:
              _context2.next = 10;
              break;
  
            case 7:
              _context2.prev = 7;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
      _Html2.default,
      {
        title: 'Internal Server Error',
        description: err.message,
        style: _ErrorPage3.default._getCss() // eslint-disable-line no-underscore-dangle
      },
      _server2.default.renderToString(_react2.default.createElement(_ErrorPage.ErrorPageWithoutStyle, { error: err }))
    ));
    res.status(err.status || 500);
    res.send('<!doctype html>' + html);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: _react.PropTypes.func.isRequired
  };
  
  /**
   * The top-level React component setting context (global) variables
   * that can be accessed from all the child components.
   *
   * https://facebook.github.io/react/docs/context.html
   *
   * Usage example:
   *
   *   const context = {
   *     history: createBrowserHistory(),
   *     store: createStore(),
   *   };
   *
   *   ReactDOM.render(<App context={context}><HomePage /></App>, container);
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return this.props.context;
      }
    }, {
      key: 'render',
      value: function render() {
        // NOTE: If you need to add or modify header, footer etc. of the app,
        // please do that inside the Layout component.
        return _react2.default.Children.only(this.props.children);
      }
    }]);
    return App;
  }(_react2.default.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape(ContextType).isRequired,
    children: _react.PropTypes.element.isRequired
  };
  App.childContextTypes = ContextType;
  exports.default = App;

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Html(_ref) {
    var title = _ref.title;
    var description = _ref.description;
    var style = _ref.style;
    var script = _ref.script;
    var children = _ref.children;
  
    return _react2.default.createElement(
      'html',
      { className: 'no-js', lang: 'en' },
      _react2.default.createElement(
        'head',
        null,
        _react2.default.createElement('meta', { charSet: 'utf-8' }),
        _react2.default.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge' }),
        _react2.default.createElement(
          'title',
          null,
          title
        ),
        _react2.default.createElement('meta', { name: 'description', content: description }),
        _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
        style && _react2.default.createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: style } })
      ),
      _react2.default.createElement(
        'body',
        null,
        _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children } }),
        script && _react2.default.createElement('script', { src: script }),
        _config.analytics.google.trackingId && _react2.default.createElement('script', {
          dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + ('ga(\'create\',\'' + _config.analytics.google.trackingId + '\',\'auto\');ga(\'send\',\'pageview\')') }
        }),
        _config.analytics.google.trackingId && _react2.default.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true }),
        _react2.default.createElement('script', { src: 'https://unpkg.com/axios/dist/axios.min.js' })
      )
    );
  }
  
  Html.propTypes = {
    title: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.string,
    script: _react.PropTypes.string,
    children: _react.PropTypes.string
  };
  
  exports.default = Html;

/***/ },
/* 26 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: {
      trackingId: process.env.GOOGLE_TRACKING_ID }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorPageWithoutStyle = undefined;
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(29);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref) {
    var error = _ref.error;
  
    if (true) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          error.name
        ),
        _react2.default.createElement(
          'p',
          null,
          error.message
        ),
        _react2.default.createElement(
          'pre',
          null,
          error.stack
        )
      );
    }
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Error'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Sorry, a critical error occurred on this page.'
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.propTypes = {
    error: _react.PropTypes.object.isRequired
  };
  
  exports.ErrorPageWithoutStyle = ErrorPage;
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(30);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 31 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(33);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(34);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(35);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(36);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(38);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(39);
  
  var _models = __webpack_require__(40);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailConfirmed: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 39 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(43);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(44);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(45);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(46);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(42);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ },
/* 42 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(42);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(41);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(255),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(42);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(41);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(42);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(41);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(42);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(41);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(255)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(255)
    }
  
  });
  
  exports.default = UserProfile;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(48);
  
  var _me = __webpack_require__(49);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(51);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(57);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(50);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(48);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(36);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(33);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(52);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(8);
  
  var _bluebird = __webpack_require__(53);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _frontMatter = __webpack_require__(54);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(55);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(48);
  
  var _ContentType = __webpack_require__(56);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var md = new _markdownIt2.default();
  
  // A folder with Markdown/HTML content pages
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 55 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(48);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(48);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(60);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(53);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(59);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(48);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(19);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(62);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _notFound = __webpack_require__(88);
  
  var _notFound2 = _interopRequireDefault(_notFound);
  
  var _project = __webpack_require__(92);
  
  var _project2 = _interopRequireDefault(_project);
  
  var _artifacts = __webpack_require__(102);
  
  var _artifacts2 = _interopRequireDefault(_artifacts);
  
  var _work = __webpack_require__(109);
  
  var _work2 = _interopRequireDefault(_work);
  
  var _processes = __webpack_require__(113);
  
  var _processes2 = _interopRequireDefault(_processes);
  
  var _people = __webpack_require__(117);
  
  var _people2 = _interopRequireDefault(_people);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    // Keep in mind, routes are evaluated in order
    children: [__webpack_require__(62).default, __webpack_require__(92).default, __webpack_require__(102).default, __webpack_require__(109).default, __webpack_require__(113).default, __webpack_require__(117).default, __webpack_require__(88).default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var route;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                route = void 0;
  
                // Execute each child route until one of them return the result
                // TODO: move this logic to the `next` function
  
              case 1:
                _context.next = 3;
                return next();
  
              case 3:
                route = _context.sent;
  
              case 4:
                if (!route) {
                  _context.next = 1;
                  break;
                }
  
              case 5:
  
                // Provide default values for title, description etc.
                route.title = (route.title || 'Untitled Page') + ' - Team Zig :D';
                route.description = route.description || '';
  
                return _context.abrupt('return', route);
  
              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // Child routes
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable global-require */
  
  // The top-level (parent) route

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(63);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_Home2.default, null)
      };
    }
  };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(64);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Home() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Header2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Home_root_2IM {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.Home_container_2Ye {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.Home_news_oTy {\n  padding: 0;\n\n}\n\n.Home_newsItem_3Ob {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.Home_newsTitle_1yW {\n  font-size: 1.125em;\n\n}\n\n.Home_newsTitle_1yW,\n.Home_newsDesc_21L {\n  display: block;\n\n}\n\n.Home_flex_2oB { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n\n.Home_wrap_3rG { -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n\n.Home_justify-center_13j     { -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n\n.Home_justify-around_1xl     { -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around; }\n\n.Home_justify-between_109    { -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; }\n\n.Home_justify-start_2tg      { -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n\n.Home_al-center_1nM  { -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n\n.Home_self-center_1xw { -webkit-align-self: center; -ms-flex-item-align: center; -ms-grid-row-align: center; align-self: center; }\n\n.Home_self-start_1Vw  { -webkit-align-self: flex-start; -ms-flex-item-align: start; align-self: flex-start; }\n\n.Home_dir-row_3sw    { -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n\n.Home_dir-column_3VB { -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/home/Home.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB;;AAED,iBAAQ,qBAAc,CAAd,sBAAc,CAAd,qBAAc,CAAd,cAAc,EAAE;;AAExB,iBAAQ,wBAAgB,CAAhB,oBAAgB,CAAhB,gBAAgB,EAAE;;AAE1B,+BAAsB,yBAAwB,CAAxB,gCAAwB,CAAxB,sBAAwB,CAAxB,wBAAwB,EAAE;;AAChD,+BAAsB,sCAA8B,CAA9B,0BAA8B,CAA9B,8BAA8B,EAAE;;AACtD,+BAAsB,0BAA+B,CAA/B,uCAA+B,CAA/B,uBAA+B,CAA/B,+BAA+B,EAAE;;AACvD,+BAAsB,wBAA4B,CAA5B,oCAA4B,CAA5B,qBAA4B,CAA5B,4BAA4B,EAAE;;AAEpD,uBAAc,0BAAoB,CAApB,4BAAoB,CAApB,uBAAoB,CAApB,oBAAoB,EAAE;;AAEpC,wBAAe,2BAAmB,CAAnB,4BAAmB,CAAnB,2BAAmB,CAAnB,mBAAmB,EAAE;;AACpC,wBAAe,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE;;AAExC,uBAAc,+BAAoB,CAApB,8BAAoB,CAApB,4BAAoB,CAApB,wBAAoB,CAApB,oBAAoB,EAAE;;AACpC,uBAAc,6BAAuB,CAAvB,8BAAuB,CAAvB,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n\n.flex { display: flex; }\n\n.wrap { flex-wrap: wrap; }\n\n.justify-center     { justify-content: center; }\n.justify-around     { justify-content: space-around; }\n.justify-between    { justify-content: space-between; }\n.justify-start      { justify-content: flex-start; }\n\n.al-center  { align-items: center; }\n\n.self-center { align-self: center; }\n.self-start  { align-self: flex-start; }\n\n.dir-row    { flex-direction: row; }\n.dir-column { flex-direction: column; }\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_2IM",
  	"container": "Home_container_2Ye",
  	"news": "Home_news_oTy",
  	"newsItem": "Home_newsItem_3Ob",
  	"newsTitle": "Home_newsTitle_1yW",
  	"newsDesc": "Home_newsDesc_21L",
  	"flex": "Home_flex_2oB",
  	"wrap": "Home_wrap_3rG",
  	"justify-center": "Home_justify-center_13j",
  	"justify-around": "Home_justify-around_1xl",
  	"justify-between": "Home_justify-between_109",
  	"justify-start": "Home_justify-start_2tg",
  	"al-center": "Home_al-center_1nM",
  	"self-center": "Home_self-center_1xw",
  	"self-start": "Home_self-start_1Vw",
  	"dir-row": "Home_dir-row_3sw",
  	"dir-column": "Home_dir-column_3VB"
  };

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Header = __webpack_require__(68);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _UserName = __webpack_require__(70);
  
  var _UserName2 = _interopRequireDefault(_UserName);
  
  var _ProjectName = __webpack_require__(74);
  
  var _ProjectName2 = _interopRequireDefault(_ProjectName);
  
  var _DateTime = __webpack_require__(77);
  
  var _DateTime2 = _interopRequireDefault(_DateTime);
  
  var _Navigation = __webpack_require__(81);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(84);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Header2.default.flex, _Header2.default.justify_center) },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(_ProjectName2.default, null),
        _react2.default.createElement(_UserName2.default, null),
        _react2.default.createElement(_DateTime2.default, null),
        _react2.default.createElement(_Navigation2.default, null)
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(69);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Header_root_3Gi {\n  background: #373277;\n  color: #fff;\n}\n\n.Header_container_1rG {\n  margin-top: 10%;\n  /*margin: 0 auto;*/\n  /*padding: 20px 0;*/\n  max-width: 1000px;\n  font-family: 'Raleway', sans-serif;\n  text-align: center;\n\n}\n\n.Header_brand_19l {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.Header_brandTxt_2mi {\n  margin-left: 10px;\n}\n\n.Header_nav_1zC {\n  text-align: center;\n}\n\n.Header_navigation_2X9 {\n  padding-top: 5%;\n  color: #57576d;\n  font-family: 'Raleway', sans-serif;\n}\n\n.Header_head_hBB {\n  margin-bottom: 3%;\n  font-size: 3em;\n  font-weight: 900;\n  color: #57576d;\n}\n\n.Header_banner_2Lc {\n  text-align: center;\n}\n\n.Header_bannerTitle_2Qz {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.Header_bannerDesc_3mm {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n\n.Header_flex_2d2 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n\n.Header_wrap_JuS { -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n\n.Header_justify_center_1xU     { -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n\n.Header_justify-around_eQv     { -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around; }\n\n.Header_justify-between_Jkk    { -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; }\n\n.Header_justify-start_2Gn      { -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n\n.Header_al-center_-4U  { -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n\n.Header_self-center_1zZ { -webkit-align-self: center; -ms-flex-item-align: center; -ms-grid-row-align: center; align-self: center; }\n\n.Header_self-start_2oC  { -webkit-align-self: flex-start; -ms-flex-item-align: start; align-self: flex-start; }\n\n.Header_dir-row_1Yl    { -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n\n.Header_dir-column_3rZ { -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n", "", {"version":3,"sources":["/./components/Header/Header.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADfD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,gBAAgB;EAChB,mBAAmB;EACnB,oBAAoB;EACpB,kBAAoC;EACpC,mCAAmC;EACnC,mBAAmB;;CAEpB;;AAED;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,gBAAgB;EAChB,eAAe;EACf,mCAAmC;CACpC;;AAED;EACE,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,UAAU;CACX;;AAED,mBAAQ,qBAAc,CAAd,sBAAc,CAAd,qBAAc,CAAd,cAAc,EAAE;;AAExB,mBAAQ,wBAAgB,CAAhB,oBAAgB,CAAhB,gBAAgB,EAAE;;AAE1B,iCAAsB,yBAAwB,CAAxB,gCAAwB,CAAxB,sBAAwB,CAAxB,wBAAwB,EAAE;;AAChD,iCAAsB,sCAA8B,CAA9B,0BAA8B,CAA9B,8BAA8B,EAAE;;AACtD,iCAAsB,0BAA+B,CAA/B,uCAA+B,CAA/B,uBAA+B,CAA/B,+BAA+B,EAAE;;AACvD,iCAAsB,wBAA4B,CAA5B,oCAA4B,CAA5B,qBAA4B,CAA5B,4BAA4B,EAAE;;AAEpD,yBAAc,0BAAoB,CAApB,4BAAoB,CAApB,uBAAoB,CAApB,oBAAoB,EAAE;;AAEpC,0BAAe,2BAAmB,CAAnB,4BAAmB,CAAnB,2BAAmB,CAAnB,mBAAmB,EAAE;;AACpC,0BAAe,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE;;AAExC,yBAAc,+BAAoB,CAApB,8BAAoB,CAApB,4BAAoB,CAApB,wBAAoB,CAApB,oBAAoB,EAAE;;AACpC,yBAAc,6BAAuB,CAAvB,8BAAuB,CAAvB,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE","file":"Header.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../variables.css';\n\n:root {\n  --brand-color: #61dafb;\n}\n\n.root {\n  background: #373277;\n  color: #fff;\n}\n\n.container {\n  margin-top: 10%;\n  /*margin: 0 auto;*/\n  /*padding: 20px 0;*/\n  max-width: var(--max-content-width);\n  font-family: 'Raleway', sans-serif;\n  text-align: center;\n\n}\n\n.brand {\n  color: color(var(--brand-color) lightness(+10%));\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.brandTxt {\n  margin-left: 10px;\n}\n\n.nav {\n  text-align: center;\n}\n\n.navigation {\n  padding-top: 5%;\n  color: #57576d;\n  font-family: 'Raleway', sans-serif;\n}\n\n.head {\n  margin-bottom: 3%;\n  font-size: 3em;\n  font-weight: 900;\n  color: #57576d;\n}\n\n.banner {\n  text-align: center;\n}\n\n.bannerTitle {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.bannerDesc {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n\n.flex { display: flex; }\n\n.wrap { flex-wrap: wrap; }\n\n.justify_center     { justify-content: center; }\n.justify-around     { justify-content: space-around; }\n.justify-between    { justify-content: space-between; }\n.justify-start      { justify-content: flex-start; }\n\n.al-center  { align-items: center; }\n\n.self-center { align-self: center; }\n.self-start  { align-self: flex-start; }\n\n.dir-row    { flex-direction: row; }\n.dir-column { flex-direction: column; }\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_3Gi",
  	"container": "Header_container_1rG",
  	"brand": "Header_brand_19l",
  	"brandTxt": "Header_brandTxt_2mi",
  	"nav": "Header_nav_1zC",
  	"navigation": "Header_navigation_2X9",
  	"head": "Header_head_hBB",
  	"banner": "Header_banner_2Lc",
  	"bannerTitle": "Header_bannerTitle_2Qz",
  	"bannerDesc": "Header_bannerDesc_3mm",
  	"flex": "Header_flex_2d2",
  	"wrap": "Header_wrap_JuS",
  	"justify_center": "Header_justify_center_1xU",
  	"justify-around": "Header_justify-around_eQv",
  	"justify-between": "Header_justify-between_Jkk",
  	"justify-start": "Header_justify-start_2Gn",
  	"al-center": "Header_al-center_-4U",
  	"self-center": "Header_self-center_1zZ",
  	"self-start": "Header_self-start_2oC",
  	"dir-row": "Header_dir-row_1Yl",
  	"dir-column": "Header_dir-column_3rZ"
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _UserName = __webpack_require__(72);
  
  var _UserName2 = _interopRequireDefault(_UserName);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserName = function (_Component) {
    (0, _inherits3.default)(UserName, _Component);
  
    function UserName(props) {
      (0, _classCallCheck3.default)(this, UserName);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (UserName.__proto__ || (0, _getPrototypeOf2.default)(UserName)).call(this, props));
  
      _this.state = {
        username: ''
      };
      return _this;
    }
  
    //componentWillMount = () => {
  
    //// MAKE A REQUEST TO THE API TO GET THE CURRENT USER
    ////
    //axios.get('http://localhost:5000/list_projects')
    //.then(function (response) {
    //this.setState({projectName: response.data});
    //console.log(response);
  
    //}.bind(this))
    //.catch(function (error) {
    //console.log(error);
  
    //});
    //}
  
    (0, _createClass3.default)(UserName, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: _UserName2.default.line_text },
            _react2.default.createElement(
              'p',
              null,
              'O Username atual \xE9 TODO THIS SHIT!!!!'
            )
          )
        );
      }
    }]);
    return UserName;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_UserName2.default)(UserName);

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("axios");

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(73);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./UserName.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./UserName.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.UserName_line_text_3EF {\n  margin: 0;\n  font-size: 1em;\n  font-weight: 200;\n  color: #57576d;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./components/UserName/UserName.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,UAAU;EACV,eAAe;EACf,iBAAiB;EACjB,eAAe;CAChB","file":"UserName.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","@import '../variables.css';\n\n\n.line_text {\n  margin: 0;\n  font-size: 1em;\n  font-weight: 200;\n  color: #57576d;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"line_text": "UserName_line_text_3EF"
  };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ProjectName = __webpack_require__(75);
  
  var _ProjectName2 = _interopRequireDefault(_ProjectName);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ProjectName = function (_Component) {
    (0, _inherits3.default)(ProjectName, _Component);
  
    function ProjectName(props) {
      (0, _classCallCheck3.default)(this, ProjectName);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectName.__proto__ || (0, _getPrototypeOf2.default)(ProjectName)).call(this, props));
  
      _this.componentWillMount = function () {
  
        axios.get('http://localhost:5000/projects').then(function (response) {
          this.setState({ projectName: response.data });
          console.log(response);
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.state = {
        projectName: ''
      };
      return _this;
    }
  
    (0, _createClass3.default)(ProjectName, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: _ProjectName2.default.main_title },
            this.state.projectName
          )
        );
      }
    }]);
    return ProjectName;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_ProjectName2.default)(ProjectName);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ProjectName.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ProjectName.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.ProjectName_main_title_2Wa {\n  text-align: center;\n  font-size: 3em;\n  font-weight: 800;\n  color: #57576d;\n  margin-bottom: 7%;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./components/ProjectName/ProjectName.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,kBAAkB;CACnB","file":"ProjectName.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","@import '../variables.css';\n\n\n.main_title {\n  text-align: center;\n  font-size: 3em;\n  font-weight: 800;\n  color: #57576d;\n  margin-bottom: 7%;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"main_title": "ProjectName_main_title_2Wa"
  };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactTime = __webpack_require__(78);
  
  var _reactTime2 = _interopRequireDefault(_reactTime);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _DateTime = __webpack_require__(79);
  
  var _DateTime2 = _interopRequireDefault(_DateTime);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var DateTime = function (_Component) {
    (0, _inherits3.default)(DateTime, _Component);
  
    function DateTime() {
      (0, _classCallCheck3.default)(this, DateTime);
      return (0, _possibleConstructorReturn3.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf2.default)(DateTime)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(DateTime, [{
      key: 'render',
      value: function render() {
        var now = new Date();
        return _react2.default.createElement(
          'div',
          { className: _DateTime2.default.line_text },
          _react2.default.createElement(
            'p',
            null,
            'Today is ',
            _react2.default.createElement(_reactTime2.default, { value: now, titleFormat: 'YYYY/MM/DD HH:mm' })
          )
        );
      }
    }]);
    return DateTime;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_DateTime2.default)(DateTime);

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("react-time");

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(80);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./DateTime.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./DateTime.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.DateTime_line_text_DjI {\n  margin: 0;\n  font-size: 1em;\n  font-weight: 200;\n  color: #57576d;\n  padding: 0;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./components/DateTime/DateTime.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,UAAU;EACV,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,WAAW;CACZ","file":"DateTime.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","@import '../variables.css';\n\n\n.line_text {\n  margin: 0;\n  font-size: 1em;\n  font-weight: 200;\n  color: #57576d;\n  padding: 0;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"line_text": "DateTime_line_text_DjI"
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(82);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(84);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/project' },
        'Project'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/work' },
        'Work'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/artifacts' },
        'Artifacts'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/processes' },
        'Processes'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/people' },
        'People'
      )
    );
  }
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  
  };
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(83);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, ".Navigation_root_Kev {\n  margin: 0;\n  margin-bottom: 3%;\n}\n\n.Navigation_link_1-r {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n\n}\n\n.Navigation_link_1-r,\n.Navigation_link_1-r:active,\n.Navigation_link_1-r:visited {\n  color: rgba(255, 255, 255, 0.6);\n\n}\n\n.Navigation_link_1-r:hover {\n  color: rgba(255, 255, 255, 1);\n\n}\n\n.Navigation_highlight_g6k {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n\n}\n\n.Navigation_highlight_g6k:hover {\n  background: rgba(0, 0, 0, 0.3);\n\n}\n\n.Navigation_spacer_2KA {\n  color: rgba(255, 255, 255, 0.3);\n\n}\n", "", {"version":3,"sources":["/./components/Navigation/Navigation.css"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,kBAAkB;CACnB;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;;CAEhC;;AAED;;;EAGE,gCAAgC;;CAEjC;;AAED;EACE,8BAA8B;;CAE/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;;CAEb;;AAED;EACE,+BAA+B;;CAEhC;;AAED;EACE,gCAAgC;;CAEjC","file":"Navigation.css","sourcesContent":[".root {\n  margin: 0;\n  margin-bottom: 3%;\n}\n\n.link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_Kev",
  	"link": "Navigation_link_1-r",
  	"highlight": "Navigation_highlight_g6k",
  	"spacer": "Navigation_spacer_2KA"
  };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(4);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(85);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(86);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          return;
        }
  
        event.preventDefault();
        _history2.default.push(_this.props.to);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var children = _props.children;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to', 'children']);
  
        return _react2.default.createElement(
          'a',
          (0, _extends3.default)({ href: to }, props, { onClick: this.handleClick }),
          children
        );
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.node,
    onClick: _react.PropTypes.func
  
  };
  exports.default = Link;

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(87);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Navigation manager, e.g. history.push('/home')
  // https://github.com/mjackson/history
  exports.default = (false) && (0, _createBrowserHistory2.default)();

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("history/createBrowserHistory");

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFound = __webpack_require__(89);
  
  var _NotFound2 = _interopRequireDefault(_NotFound);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'Page Not Found';
  
  exports.default = {
  
    path: '*',
  
    action: function action() {
      return {
        title: title,
        component: _react2.default.createElement(_NotFound2.default, { title: title }),
        status: 404
      };
    }
  };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFound = __webpack_require__(90);
  
  var _NotFound2 = _interopRequireDefault(_NotFound);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function NotFound(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _NotFound2.default.root },
      _react2.default.createElement(
        'div',
        { className: _NotFound2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'Sorry, the page you were trying to view does not exist.'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  NotFound.propTypes = {
    title: _react.PropTypes.string.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(_NotFound2.default)(NotFound);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(91);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./NotFound.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./NotFound.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.NotFound_root_3wh {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.NotFound_container_1BO {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./routes/notFound/NotFound.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"NotFound.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "NotFound_root_3wh",
  	"container": "NotFound_container_1BO"
  };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Project = __webpack_require__(93);
  
  var _Project2 = _interopRequireDefault(_Project);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/project',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_Project2.default, null)
      };
    }
  };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Project = __webpack_require__(94);
  
  var _Project2 = _interopRequireDefault(_Project);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Commits = __webpack_require__(96);
  
  var _Commits2 = _interopRequireDefault(_Commits);
  
  var _CommitsGraph = __webpack_require__(100);
  
  var _CommitsGraph2 = _interopRequireDefault(_CommitsGraph);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Project() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Header2.default, null),
      _react2.default.createElement(_CommitsGraph2.default, null),
      _react2.default.createElement(_Commits2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Project2.default)(Project);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(95);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Project.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Project.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Project_root_lYx {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.Project_container_3KE {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.Project_news_VLx {\n  padding: 0;\n\n}\n\n.Project_newsItem_v2d {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.Project_newsTitle_3cH {\n  font-size: 1.125em;\n\n}\n\n.Project_newsTitle_3cH,\n.Project_newsDesc_2hC {\n  display: block;\n\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/project/Project.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB","file":"Project.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Project_root_lYx",
  	"container": "Project_container_3KE",
  	"news": "Project_news_VLx",
  	"newsItem": "Project_newsItem_v2d",
  	"newsTitle": "Project_newsTitle_3cH",
  	"newsDesc": "Project_newsDesc_2hC"
  };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _keys = __webpack_require__(97);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _Commits = __webpack_require__(98);
  
  var _Commits2 = _interopRequireDefault(_Commits);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _UserName = __webpack_require__(70);
  
  var _UserName2 = _interopRequireDefault(_UserName);
  
  var _ProjectName = __webpack_require__(74);
  
  var _ProjectName2 = _interopRequireDefault(_ProjectName);
  
  var _Navigation = __webpack_require__(81);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(84);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Commits = function (_Component) {
    (0, _inherits3.default)(Commits, _Component);
  
    function Commits(props) {
      (0, _classCallCheck3.default)(this, Commits);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Commits.__proto__ || (0, _getPrototypeOf2.default)(Commits)).call(this, props));
  
      _this.componentWillMount = function () {
        axios.get('http://localhost:5000/projects/contributors').then(function (response) {
          console.log(response.data);
          this.setState({ contributors: response.data });
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.state = {
        contributors: ''
      };
      return _this;
    }
  
    (0, _createClass3.default)(Commits, [{
      key: 'render',
      value: function render() {
        if (this.state.contributors) {
          return _react2.default.createElement(
            'div',
            null,
            (0, _keys2.default)(this.state.contributors).map(function (key) {
              return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(_Commits2.default.table, _Commits2.default.lines) },
                _react2.default.createElement(
                  'div',
                  null,
                  'Name: ',
                  this.state.contributors[key].name
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Email: ',
                  this.state.contributors[key].email
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Commits: ',
                  this.state.contributors[key].commits
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Additions: ',
                  this.state.contributors[key].additions
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Deletions: ',
                  this.state.contributors[key].deletions
                )
              );
            }.bind(this))
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: _Commits2.default.loading_style },
            'LOADING'
          );
        }
      }
    }]);
    return Commits;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Commits2.default)(Commits);

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(99);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Commits.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Commits.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n.Commits_flex_TtV { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n\n.Commits_wrap_2ta { -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; }\n\n.Commits_justify_center_i2F     { -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n\n.Commits_justify-around_1vQ     { -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around; }\n\n.Commits_justify-between_3W_    { -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; }\n\n.Commits_justify-start_2Bl      { -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n\n.Commits_al-center_2XJ  { -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; }\n\n.Commits_self-center_2-_ { -webkit-align-self: center; -ms-flex-item-align: center; -ms-grid-row-align: center; align-self: center; }\n\n.Commits_self-start_1UY  { -webkit-align-self: flex-start; -ms-flex-item-align: start; align-self: flex-start; }\n\n.Commits_dir-row_2IW    { -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n\n.Commits_dir_column_16Y { -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n\n.Commits_wd-5_2q3   { float: left; width: 5%; }\n\n.Commits_wd-10_2Nu  { float: left; width: 10%; }\n\n.Commits_wd-15_fnD  { float: left; width: 15%; }\n\n.Commits_wd-20_31r  { float: left; width: 20%; }\n\n.Commits_wd_30_3DF  { float: left; width: 30%; }\n\n.Commits_wd-40_2_b  { float: left; width: 40%; }\n\n.Commits_wd-50_aP9  { float: left; width: 50%; }\n\n.Commits_wd-60_3bk  { float: left; width: 60%; }\n\n.Commits_wd-65_233  { float: left; width: 65%; }\n\n.Commits_wd-70_2vT  { float: left; width: 70%; }\n\n.Commits_wd-80_2vI  { float: left; width: 80%; }\n\n.Commits_wd-90_2Gq  { float: left; width: 90%; }\n\n.Commits_wd-100_1h3 { float: left; width:100%; }\n\n.Commits_fs_2d5     { height: 100vh; }\n\n.Commits_fs-55_PkL  { height: 55vh; }\n\n.Commits_fs-75_3Ky  { height: 75vh; }\n\n.Commits_table_3t6 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  float: left;\n  width: 60%;\n  margin-top: 3%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.Commits_lines_325 {\nwidth: 27%;\ntext-align: left;\nmargin: 3% 3%;\nfont-family: 'Raleway', sans-serif;\nfont-size: 1em;\ncolor: #57576d;\nfont-weight: 100;\n}\n\n.Commits_loading_style_3Jn {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n", "", {"version":3,"sources":["/./components/Commits/Commits.css"],"names":[],"mappings":";;AAEA,oBAAQ,qBAAc,CAAd,sBAAc,CAAd,qBAAc,CAAd,cAAc,EAAE;;AAExB,oBAAQ,wBAAgB,CAAhB,oBAAgB,CAAhB,gBAAgB,EAAE;;AAE1B,kCAAsB,yBAAwB,CAAxB,gCAAwB,CAAxB,sBAAwB,CAAxB,wBAAwB,EAAE;;AAChD,kCAAsB,sCAA8B,CAA9B,0BAA8B,CAA9B,8BAA8B,EAAE;;AACtD,kCAAsB,0BAA+B,CAA/B,uCAA+B,CAA/B,uBAA+B,CAA/B,+BAA+B,EAAE;;AACvD,kCAAsB,wBAA4B,CAA5B,oCAA4B,CAA5B,qBAA4B,CAA5B,4BAA4B,EAAE;;AAEpD,0BAAc,0BAAoB,CAApB,4BAAoB,CAApB,uBAAoB,CAApB,oBAAoB,EAAE;;AAEpC,2BAAe,2BAAmB,CAAnB,4BAAmB,CAAnB,2BAAmB,CAAnB,mBAAmB,EAAE;;AACpC,2BAAe,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE;;AAExC,0BAAc,+BAAoB,CAApB,8BAAoB,CAApB,4BAAoB,CAApB,wBAAoB,CAApB,oBAAoB,EAAE;;AACpC,0BAAc,6BAAuB,CAAvB,8BAAuB,CAAvB,+BAAuB,CAAvB,2BAAuB,CAAvB,uBAAuB,EAAE;;AAEvC,sBAAU,YAAY,CAAC,UAAU,EAAE;;AACnC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AACpC,sBAAU,YAAY,CAAC,WAAW,EAAE;;AAEpC,sBAAU,cAAc,EAAE;;AAC1B,sBAAU,aAAa,EAAE;;AACzB,sBAAU,aAAa,EAAE;;AAGzB;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;CACxB;;AAED;AACA,WAAW;AACX,iBAAiB;AACjB,cAAc;AACd,mCAAmC;AACnC,eAAe;AACf,eAAe;AACf,iBAAiB;CAChB;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,mCAAmC;EACnC,eAAe;EACf,eAAe;EACf,iBAAiB;CAClB","file":"Commits.css","sourcesContent":["\n\n.flex { display: flex; }\n\n.wrap { flex-wrap: wrap; }\n\n.justify_center     { justify-content: center; }\n.justify-around     { justify-content: space-around; }\n.justify-between    { justify-content: space-between; }\n.justify-start      { justify-content: flex-start; }\n\n.al-center  { align-items: center; }\n\n.self-center { align-self: center; }\n.self-start  { align-self: flex-start; }\n\n.dir-row    { flex-direction: row; }\n.dir_column { flex-direction: column; }\n\n.wd-5   { float: left; width: 5%; }\n.wd-10  { float: left; width: 10%; }\n.wd-15  { float: left; width: 15%; }\n.wd-20  { float: left; width: 20%; }\n.wd_30  { float: left; width: 30%; }\n.wd-40  { float: left; width: 40%; }\n.wd-50  { float: left; width: 50%; }\n.wd-60  { float: left; width: 60%; }\n.wd-65  { float: left; width: 65%; }\n.wd-70  { float: left; width: 70%; }\n.wd-80  { float: left; width: 80%; }\n.wd-90  { float: left; width: 90%; }\n.wd-100 { float: left; width:100%; }\n\n.fs     { height: 100vh; }\n.fs-55  { height: 55vh; }\n.fs-75  { height: 75vh; }\n\n\n.table {\n  display: flex;\n  text-align: center;\n  float: left;\n  width: 60%;\n  margin-top: 3%;\n  flex-direction: column;\n}\n\n.lines {\nwidth: 27%;\ntext-align: left;\nmargin: 3% 3%;\nfont-family: 'Raleway', sans-serif;\nfont-size: 1em;\ncolor: #57576d;\nfont-weight: 100;\n}\n\n.loading_style {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"flex": "Commits_flex_TtV",
  	"wrap": "Commits_wrap_2ta",
  	"justify_center": "Commits_justify_center_i2F",
  	"justify-around": "Commits_justify-around_1vQ",
  	"justify-between": "Commits_justify-between_3W_",
  	"justify-start": "Commits_justify-start_2Bl",
  	"al-center": "Commits_al-center_2XJ",
  	"self-center": "Commits_self-center_2-_",
  	"self-start": "Commits_self-start_1UY",
  	"dir-row": "Commits_dir-row_2IW",
  	"dir_column": "Commits_dir_column_16Y",
  	"wd-5": "Commits_wd-5_2q3",
  	"wd-10": "Commits_wd-10_2Nu",
  	"wd-15": "Commits_wd-15_fnD",
  	"wd-20": "Commits_wd-20_31r",
  	"wd_30": "Commits_wd_30_3DF",
  	"wd-40": "Commits_wd-40_2_b",
  	"wd-50": "Commits_wd-50_aP9",
  	"wd-60": "Commits_wd-60_3bk",
  	"wd-65": "Commits_wd-65_233",
  	"wd-70": "Commits_wd-70_2vT",
  	"wd-80": "Commits_wd-80_2vI",
  	"wd-90": "Commits_wd-90_2Gq",
  	"wd-100": "Commits_wd-100_1h3",
  	"fs": "Commits_fs_2d5",
  	"fs-55": "Commits_fs-55_PkL",
  	"fs-75": "Commits_fs-75_3Ky",
  	"table": "Commits_table_3t6",
  	"lines": "Commits_lines_325",
  	"loading_style": "Commits_loading_style_3Jn"
  };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _CommitsGraph = __webpack_require__(123);
  
  var _CommitsGraph2 = _interopRequireDefault(_CommitsGraph);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var LineChart = __webpack_require__(101).Line;
  
  var CommitsGraph = function (_Component) {
    (0, _inherits3.default)(CommitsGraph, _Component);
  
    function CommitsGraph(props) {
      (0, _classCallCheck3.default)(this, CommitsGraph);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (CommitsGraph.__proto__ || (0, _getPrototypeOf2.default)(CommitsGraph)).call(this, props));
  
      _this.componentWillMount = function () {
        axios.get('http://localhost:5000/projects/weekly_contributions').then(function (response) {
          this.chartData.datasets[0].data = response.data;
          this.setState({ check: true });
          console.log(response.data);
          console.log("já dei update");
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.state = {
        check: false
      };
      _this.chartData = {
        labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13"],
        datasets: [{
          label: "My First dataset",
          fillColor: "rgba(150,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: []
        }]
      };
      _this.chartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };
      return _this;
    }
  
    (0, _createClass3.default)(CommitsGraph, [{
      key: 'render',
      value: function render() {
        if (this.state.check) {
          return _react2.default.createElement(LineChart, { data: this.chartData, options: this.chartOptions, width: '600', height: '250', className: _CommitsGraph2.default.loading_style });
        } else {
          return _react2.default.createElement(
            'div',
            { className: _CommitsGraph2.default.loading_style },
            'LOADING CHART'
          );
        }
      }
    }]);
    return CommitsGraph;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_CommitsGraph2.default)(CommitsGraph);

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("react-chartjs");

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Artifacts = __webpack_require__(103);
  
  var _Artifacts2 = _interopRequireDefault(_Artifacts);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/artifacts',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_Artifacts2.default, null)
      };
    }
  };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Artifacts = __webpack_require__(104);
  
  var _Artifacts2 = _interopRequireDefault(_Artifacts);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _ListProjectFiles = __webpack_require__(106);
  
  var _ListProjectFiles2 = _interopRequireDefault(_ListProjectFiles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Artifacts() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        ' Artifacts '
      ),
      _react2.default.createElement(_Header2.default, null),
      _react2.default.createElement(_ListProjectFiles2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Artifacts2.default)(Artifacts);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(105);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Artifacts.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Artifacts.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Artifacts_root_2H8 {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.Artifacts_container_Bso {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.Artifacts_news_qdB {\n  padding: 0;\n\n}\n\n.Artifacts_newsItem_1uZ {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.Artifacts_newsTitle_3y8 {\n  font-size: 1.125em;\n\n}\n\n.Artifacts_newsTitle_3y8,\n.Artifacts_newsDesc_2qZ {\n  display: block;\n\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/artifacts/Artifacts.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB","file":"Artifacts.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Artifacts_root_2H8",
  	"container": "Artifacts_container_Bso",
  	"news": "Artifacts_news_qdB",
  	"newsItem": "Artifacts_newsItem_1uZ",
  	"newsTitle": "Artifacts_newsTitle_3y8",
  	"newsDesc": "Artifacts_newsDesc_2qZ"
  };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _keys = __webpack_require__(97);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ListProjectFiles = __webpack_require__(107);
  
  var _ListProjectFiles2 = _interopRequireDefault(_ListProjectFiles);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ListProjectFiles = function (_Component) {
    (0, _inherits3.default)(ListProjectFiles, _Component);
  
    function ListProjectFiles(props) {
      (0, _classCallCheck3.default)(this, ListProjectFiles);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ListProjectFiles.__proto__ || (0, _getPrototypeOf2.default)(ListProjectFiles)).call(this, props));
  
      _this.componentWillMount = function () {
        axios.get('http://localhost:5000/projects/folders').then(function (response) {
          this.setState({ files: response.data });
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.handleClick = function (key, value, e) {
        axios.post('http://localhost:5000/projects/folders', {
          folder: key
        }).then(function (response) {
          this.setState({ files: response.data });
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.backHandleClick = function () {
        axios.post('http://localhost:5000/projects/folders', {
          folder: ''
        }).then(function (response) {
          this.setState({ files: response.data });
        }.bind(_this)).catch(function (error) {
          console.log(error);
        });
      };
  
      _this.render = function () {
        if (_this.state.files) {
          return _react2.default.createElement(
            'div',
            { className: _ListProjectFiles2.default.grid },
            _react2.default.createElement(
              'h2',
              { className: _ListProjectFiles2.default.grid_v },
              _react2.default.createElement(
                'p',
                { onClick: _this.backHandleClick, className: _ListProjectFiles2.default.points },
                ' .. '
              ),
              (0, _keys2.default)(_this.state.files).map(function (key) {
                if (this.state.files[key] == "tree") {
                  var boundItemClick = this.handleClick.bind(this, key, this.state.files[key]);
                  return _react2.default.createElement(
                    'p',
                    { onClick: boundItemClick, className: _ListProjectFiles2.default.file_list },
                    key
                  );
                }
                return _react2.default.createElement(
                  'p',
                  { className: _ListProjectFiles2.default.file_list },
                  ' ',
                  key,
                  ' '
                );
              }.bind(_this))
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: _ListProjectFiles2.default.loading_style },
            'Loading'
          );
        }
      };
  
      _this.state = {
        files: ''
      };
      return _this;
    }
  
    return ListProjectFiles;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_ListProjectFiles2.default)(ListProjectFiles);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(108);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ListProjectFiles.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ListProjectFiles.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "\n.ListProjectFiles_file_list_sKU {\n    border: 1px #e6e6e6 solid;\n    border-radius: 10px;\n    padding: 2% 24% 2% 2%;\n    font-family: 'Raleway', sans-serif;\n    font-size: 0.8em;\n    color: #57576d;\n    font-weight: 100;\n}\n\n\n.ListProjectFiles_points_KWe {\n  font-size: 1em;\n  margin-bottom: 5%;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  color: #57576d;\n}\n\n\n.ListProjectFiles_grid_2n7 {\n  margin-bottom: 5%;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n\n.ListProjectFiles_grid_v_3N8 {\n  width: 60%;\n}\n\n\n.ListProjectFiles_loading_style_3Mh {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n", "", {"version":3,"sources":["/./components/ListProjectFiles/ListProjectFiles.css"],"names":[],"mappings":";AACA;IACI,0BAA0B;IAC1B,oBAAoB;IACpB,sBAAsB;IACtB,mCAAmC;IACnC,iBAAiB;IACjB,eAAe;IACf,iBAAiB;CACpB;;;AAGD;EACE,eAAe;EACf,kBAAkB;EAClB,0BAAoB;EAApB,4BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,eAAe;CAChB;;;AAED;EACE,kBAAkB;EAClB,0BAAoB;EAApB,4BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;CACf;;;AAED;EACE,WAAW;CACZ;;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,mCAAmC;EACnC,eAAe;EACf,eAAe;EACf,iBAAiB;CAClB","file":"ListProjectFiles.css","sourcesContent":["\n.file_list {\n    border: 1px #e6e6e6 solid;\n    border-radius: 10px;\n    padding: 2% 24% 2% 2%;\n    font-family: 'Raleway', sans-serif;\n    font-size: 0.8em;\n    color: #57576d;\n    font-weight: 100;\n}\n\n\n.points {\n  font-size: 1em;\n  margin-bottom: 5%;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  color: #57576d;\n}\n\n.grid {\n  margin-bottom: 5%;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n}\n\n.grid_v {\n  width: 60%;\n}\n\n.loading_style {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"file_list": "ListProjectFiles_file_list_sKU",
  	"points": "ListProjectFiles_points_KWe",
  	"grid": "ListProjectFiles_grid_2n7",
  	"grid_v": "ListProjectFiles_grid_v_3N8",
  	"loading_style": "ListProjectFiles_loading_style_3Mh"
  };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Work = __webpack_require__(110);
  
  var _Work2 = _interopRequireDefault(_Work);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/work',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_Work2.default, null)
      };
    }
  };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Work = __webpack_require__(111);
  
  var _Work2 = _interopRequireDefault(_Work);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Work() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        ' Work '
      ),
      _react2.default.createElement(_Header2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Work2.default)(Work);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(112);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Work.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Work.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Work_root_3vP {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.Work_container_2ar {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.Work_news_1js {\n  padding: 0;\n\n}\n\n.Work_newsItem_11v {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.Work_newsTitle_M4I {\n  font-size: 1.125em;\n\n}\n\n.Work_newsTitle_M4I,\n.Work_newsDesc_1rD {\n  display: block;\n\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/work/Work.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB","file":"Work.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Work_root_3vP",
  	"container": "Work_container_2ar",
  	"news": "Work_news_1js",
  	"newsItem": "Work_newsItem_11v",
  	"newsTitle": "Work_newsTitle_M4I",
  	"newsDesc": "Work_newsDesc_1rD"
  };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Processes = __webpack_require__(114);
  
  var _Processes2 = _interopRequireDefault(_Processes);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/processes',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_Processes2.default, null)
      };
    }
  };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Processes = __webpack_require__(115);
  
  var _Processes2 = _interopRequireDefault(_Processes);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Processes() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        ' Processes '
      ),
      _react2.default.createElement(_Header2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Processes2.default)(Processes);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(116);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Processes.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Processes.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Processes_root_3Bz {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.Processes_container_3Y3 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.Processes_news_1bc {\n  padding: 0;\n\n}\n\n.Processes_newsItem_2uV {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.Processes_newsTitle_aKw {\n  font-size: 1.125em;\n\n}\n\n.Processes_newsTitle_aKw,\n.Processes_newsDesc_Tnn {\n  display: block;\n\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/processes/Processes.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB","file":"Processes.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Processes_root_3Bz",
  	"container": "Processes_container_3Y3",
  	"news": "Processes_news_1bc",
  	"newsItem": "Processes_newsItem_2uV",
  	"newsTitle": "Processes_newsTitle_aKw",
  	"newsDesc": "Processes_newsDesc_Tnn"
  };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _People = __webpack_require__(118);
  
  var _People2 = _interopRequireDefault(_People);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/people',
  
    action: function action() {
      return {
        component: _react2.default.createElement(_People2.default, null)
      };
    }
  };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _People = __webpack_require__(119);
  
  var _People2 = _interopRequireDefault(_People);
  
  var _Header = __webpack_require__(67);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _ProjectMembers = __webpack_require__(121);
  
  var _ProjectMembers2 = _interopRequireDefault(_ProjectMembers);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function People() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        ' People '
      ),
      _react2.default.createElement(_Header2.default, null),
      _react2.default.createElement(_ProjectMembers2.default, null)
    );
  }
  
  exports.default = (0, _withStyles2.default)(_People2.default)(People);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(120);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./People.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./People.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.People_root_117 {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.People_container_1aq {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n\n}\n\n.People_news_3Xw {\n  padding: 0;\n\n}\n\n.People_newsItem_1iM {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.People_newsTitle_20J {\n  font-size: 1.125em;\n\n}\n\n.People_newsTitle_20J,\n.People_newsDesc_3wj {\n  display: block;\n\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/people/People.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AC3BD;EACE,mBAAmB;EACnB,oBAAoB;;CAErB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;;CAErC;;AAED;EACE,WAAW;;CAEZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;;CAErB;;AAED;EACE,mBAAmB;;CAEpB;;AAED;;EAEE,eAAe;;CAEhB","file":"People.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n\n}\n\n.news {\n  padding: 0;\n\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n\n}\n\n.newsTitle {\n  font-size: 1.125em;\n\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "People_root_117",
  	"container": "People_container_1aq",
  	"news": "People_news_3Xw",
  	"newsItem": "People_newsItem_1iM",
  	"newsTitle": "People_newsTitle_20J",
  	"newsDesc": "People_newsDesc_3wj"
  };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _keys = __webpack_require__(97);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _axios = __webpack_require__(71);
  
  var axios = _interopRequireWildcard(_axios);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ProjectMembers = __webpack_require__(125);
  
  var _ProjectMembers2 = _interopRequireDefault(_ProjectMembers);
  
  var _classnames = __webpack_require__(66);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ProjectMembers = function (_Component) {
    (0, _inherits3.default)(ProjectMembers, _Component);
  
    function ProjectMembers(props) {
      (0, _classCallCheck3.default)(this, ProjectMembers);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (ProjectMembers.__proto__ || (0, _getPrototypeOf2.default)(ProjectMembers)).call(this, props));
  
      _this.componentWillMount = function () {
        axios.get('http://localhost:5000/projects/members').then(function (response) {
          this.setState({ contributors: response.data });
        }.bind(_this)).catch(function (error) {});
      };
  
      _this.render = function () {
        if (_this.state.contributors) {
          return _react2.default.createElement(
            'div',
            null,
            (0, _keys2.default)(_this.state.contributors).map(function (contributor) {
              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'li',
                  { className: _ProjectMembers2.default.file_list },
                  ' ',
                  this.state.contributors[contributor],
                  ' '
                )
              );
            }.bind(_this))
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: _ProjectMembers2.default.loading_style },
            'Loading'
          );
        }
      };
  
      _this.state = {
        contributors: ''
      };
      return _this;
    }
  
    return ProjectMembers;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_ProjectMembers2.default)(ProjectMembers);

/***/ },
/* 122 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(124);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./CommitsGraph.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./CommitsGraph.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, ".CommitsGraph_loading_style_2zQ {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n\n.CommitsGraph_graphic_Y5i {\n  margin-top: 3%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n", "", {"version":3,"sources":["/./components/CommitsGraph/CommitsGraph.css"],"names":[],"mappings":"AAAA;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,mCAAmC;EACnC,eAAe;EACf,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;EAApB,4BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;CACrB","file":"CommitsGraph.css","sourcesContent":[".loading_style {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n\n.graphic {\n  margin-top: 3%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"loading_style": "CommitsGraph_loading_style_2zQ",
  	"graphic": "CommitsGraph_graphic_Y5i"
  };

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(126);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ProjectMembers.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ProjectMembers.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, ".ProjectMembers_file_list_HvE {\n    border: 1px #e6e6e6 solid;\n    border-radius: 10px;\n    padding: 2% 24% 2% 2%;\n    font-family: 'Raleway', sans-serif;\n    font-size: 0.8em;\n    color: #57576d;\n    font-weight: 100;\n    text-decoration: none;\n}\n\n.ProjectMembers_loading_style_1PE {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n", "", {"version":3,"sources":["/./components/ProjectMembers/ProjectMembers.css"],"names":[],"mappings":"AAAA;IACI,0BAA0B;IAC1B,oBAAoB;IACpB,sBAAsB;IACtB,mCAAmC;IACnC,iBAAiB;IACjB,eAAe;IACf,iBAAiB;IACjB,sBAAsB;CACzB;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,yBAAwB;EAAxB,gCAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,mCAAmC;EACnC,eAAe;EACf,eAAe;EACf,iBAAiB;CAClB","file":"ProjectMembers.css","sourcesContent":[".file_list {\n    border: 1px #e6e6e6 solid;\n    border-radius: 10px;\n    padding: 2% 24% 2% 2%;\n    font-family: 'Raleway', sans-serif;\n    font-size: 0.8em;\n    color: #57576d;\n    font-weight: 100;\n    text-decoration: none;\n}\n\n.loading_style {\n  display: flex;\n  text-align: center;\n  justify-content: center;\n  font-family: 'Raleway', sans-serif;\n  font-size: 1em;\n  color: #57576d;\n  font-weight: 500;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"file_list": "ProjectMembers_file_list_HvE",
  	"loading_style": "ProjectMembers_loading_style_1PE"
  };

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map