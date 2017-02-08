// const postcss = require('postcss');
//
// module.exports = {
// 	scroll: (mixin, col) => {
// 		for #{$col} from 1 to 12 {
// 			flex-basis: calc{#{$col} * $col-width};
// 		}
// 		mixin.replaceWith(rule);
// 	},
// };
//
//
// @for $i from 1 to 12 {
//   .col-lg-$i {
//     flex-basis: calc($i * $col-width);
//   }
// }
//
//
// @mixin scroll($scroll, $block) {
// 	overflow-#{$scroll}: auto;
// 	overflow-#{$block}: hidden;
// 	-webkit-overflow-scrolling: touch;
// }
//
// .u-scroll-v {
// 	@include scroll('y', 'x');
// }
//
// .u-scroll-h {
// 	@include scroll('x', 'y');
// }
//
