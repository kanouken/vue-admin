<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      default: "#0099cc"
    }
  },
  render(h, context) {
    const { icon, title, color } = context.props;
    const vnodes = [];
    if (icon.indexOf("icon") != -1) {
      vnodes.push(<i class={icon} ref="menuIcon" />);
    } else {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
<style lang="scss" scoped>
.el-submenu__title i {
  color: inherit;
}
</style>
