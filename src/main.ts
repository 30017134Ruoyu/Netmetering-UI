import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router/router";
import "ant-design-vue/dist/reset.css";

// primevue
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Textarea from "primevue/textarea";
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Divider from "primevue/divider";
import Rating from "primevue/rating";
import Message from "primevue/message";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Password from "primevue/password";
import ToggleButton from "primevue/togglebutton";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Slider from "primevue/slider";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import SpeedDial from "primevue/speeddial";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Dialog from "primevue/dialog";
import Chips from "primevue/chips";
import SelectButton from "primevue/selectbutton";

// import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/themes/aura-light-green/theme.css";
// import "primevue/resources/themes/aura-light-amber/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

import SideBar from "@/components/sidebar.vue";
import Header from "@/components/Header.vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: false });
app.use(ToastService);
app.use(ConfirmationService);

app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Menu", Menu);
app.component("Sidebar", Sidebar);
app.component("SideBar", SideBar);
app.component("Header", Header);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("Divider", Divider);
app.component("Rating", Rating);
app.component("Message", Message);
app.component("Toast", Toast);
app.component("Textarea", Textarea);
app.component("Stepper", Stepper);
app.component("StepperPanel", StepperPanel);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Password", Password);
app.component("ToggleButton", ToggleButton);
app.component("InputNumber", InputNumber);
app.component("MultiSelect", MultiSelect);
app.component("Calendar", Calendar);
app.component("RadioButton", RadioButton);
app.component("Checkbox", Checkbox);
app.component("InputSwitch", InputSwitch);
app.component("Dropdown", Dropdown);
app.component("Slider", Slider);
app.component("ConfirmDialog", ConfirmDialog);
app.component("SpeedDial", SpeedDial);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Dialog", Dialog);
app.component("Chips", Chips);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("SelectButton", SelectButton);

app.use(Antd).mount("#app");
