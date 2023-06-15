declare module '*.vue' {
  import { ComponentOptions, default as Vue } from 'vue';
  const componentOptions: ComponentOptions<Vue>;
  export default componentOptions;
}