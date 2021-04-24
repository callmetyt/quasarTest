import Vue from "vue";

//引入quasar的scss样式
import "../styles/quasar.scss";
//使用fontawesome图标
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
//引入quasar插件
import { Quasar, QInput, QBtn, Notify, QTabs, QTab, QIcon } from "quasar";
import { QCard, QCardSection, QCardActions, QSeparator } from "quasar";
import { QTable, QTh, QTr, QTd } from "quasar";
import { QDialog, ClosePopup } from "quasar";

//利用 Vue.use 方法安装quasar插件
Vue.use(Quasar, {
  config: {
    extras: ["fontawesome-v5"],
  },
  plugins: {
    Notify,
  },
  iconSet: iconSet,
  components: {
    QBtn,
    QInput,
    QTabs,
    QTab,
    QIcon,
    QCard,
    QCardActions,
    QCardSection,
    QSeparator,
    QTable,
    QTh,
    QTr,
    QTd,
    QDialog,
  },
  directives: {
    ClosePopup,
  },
});
