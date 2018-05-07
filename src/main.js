/**
 * Created by Shark on 18/2/01.
 */

import Vue from 'vue'
import router from './router/index'
import Config from './assets/js/config'
// import Home from './components/home.vue'

import {
    DatePicker,
    TimePicker,
    Switch,
    CheckboxGroup,
    Checkbox,
    RadioGroup,
    Radio,
    Button,
    Select,
    Row,
    Col,
    Pagination,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Dialog,
    Option,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Upload,
    Aside,
    Container,
    Header,
    Footer,
    Main,
    Tag,
    Card,
    Popover,
    Loading,
    Message,
    MessageBox
} from 'element-ui'

import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

import moment from 'moment'
import axios from 'axios'
import curvejs from 'curvejs'

import VueEditable from './plugins/vueEditable.js'
Vue.use(VueEditable)

Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$axios', { value: axios });
Object.defineProperty(Vue.prototype, '$curvejs', { value: curvejs });
axios.defaults.baseURL = Config.API_URIL

Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Upload)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Tag)
Vue.use(DatePicker),
Vue.use(TimePicker),
Vue.use(Switch),
Vue.use(CheckboxGroup),
Vue.use(Checkbox),
Vue.use(RadioGroup),
Vue.use(Radio),
Vue.use(Card)
Vue.use(Popover)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)

Vue.use(Loading.directive);


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

locale.use(lang)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

