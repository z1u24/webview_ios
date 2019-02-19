_$define("pi_pt/rust/def/vec", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var bigInt = require("../../../pi/bigint/biginteger");
var sinfo_1 = require("../../../pi/struct/sinfo");
var db_1 = require("../pi_db/db");
/// A contiguous growable array type, written `Vec<T>` but pronounced 'vector'.
///
/// # Examples
///
/// ```
/// let mut vec = Vec::new();
/// vec.push(1);
/// vec.push(2);
///
/// assert_eq!(vec.len(), 2);
/// assert_eq!(vec[0], 1);
///
/// assert_eq!(vec.pop(), Some(2));
/// assert_eq!(vec.len(), 1);
///
/// vec[0] = 7;
/// assert_eq!(vec[0], 7);
///
/// vec.extend([1, 2, 3].iter().cloned());
///
/// for x in &vec {
///     println!("{}", x);
/// }
/// assert_eq!(vec, [7, 1, 2, 3]);
/// ```
///
/// The [`vec!`] macro is provided to make initialization more convenient:
///
/// ```
/// let mut vec = vec![1, 2, 3];
/// vec.push(4);
/// assert_eq!(vec, [1, 2, 3, 4]);
/// ```
///
/// It can also initialize each element of a `Vec<T>` with a given value:
///
/// ```
/// let vec = vec![0; 5];
/// assert_eq!(vec, [0, 0, 0, 0, 0]);
/// ```
///
/// Use a `Vec<T>` as an efficient stack:
///
/// ```
/// let mut stack = Vec::new();
///
/// stack.push(1);
/// stack.push(2);
/// stack.push(3);
///
/// while let Some(top) = stack.pop() {
///     // Prints 3, 2, 1
///     println!("{}", top);
/// }
/// ```
///
/// # Indexing
///
/// The `Vec` type allows to access values by index, because it implements the
/// [`Index`] trait. An example will be more explicit:
///
/// ```
/// let v = vec![0, 2, 4, 6];
/// println!("{}", v[1]); // it will display '2'
/// ```
///
/// However be careful: if you try to access an index which isn't in the `Vec`,
/// your software will panic! You cannot do this:
///
/// ```should_panic
/// let v = vec![0, 2, 4, 6];
/// println!("{}", v[6]); // it will panic!
/// ```
///
/// In conclusion: always check if the index you want to get really exists
/// before doing it.
///
/// # Slicing
///
/// A `Vec` can be mutable. Slices, on the other hand, are read-only objects.
/// To get a slice, use `&`. Example:
///
/// ```
/// fn read_slice(slice: &[usize]) {
///     // ...
/// }
///
/// let v = vec![0, 1];
/// read_slice(&v);
///
/// // ... and that's all!
/// // you can also do it like this:
/// let x : &[usize] = &v;
/// ```
///
/// In Rust, it's more common to pass slices as arguments rather than vectors
/// when you just want to provide a read access. The same goes for [`String`] and
/// [`&str`].
///
/// # Capacity and reallocation
///
/// The capacity of a vector is the amount of space allocated for any future
/// elements that will be added onto the vector. This is not to be confused with
/// the *length* of a vector, which specifies the number of actual elements
/// within the vector. If a vector's length exceeds its capacity, its capacity
/// will automatically be increased, but its elements will have to be
/// reallocated.
///
/// For example, a vector with capacity 10 and length 0 would be an empty vector
/// with space for 10 more elements. Pushing 10 or fewer elements onto the
/// vector will not change its capacity or cause reallocation to occur. However,
/// if the vector's length is increased to 11, it will have to reallocate, which
/// can be slow. For this reason, it is recommended to use [`Vec::with_capacity`]
/// whenever possible to specify how big the vector is expected to get.
///
/// # Guarantees
///
/// Due to its incredibly fundamental nature, `Vec` makes a lot of guarantees
/// about its design. This ensures that it's as low-overhead as possible in
/// the general case, and can be correctly manipulated in primitive ways
/// by unsafe code. Note that these guarantees refer to an unqualified `Vec<T>`.
/// If additional type parameters are added (e.g. to support custom allocators),
/// overriding their defaults may change the behavior.
///
/// Most fundamentally, `Vec` is and always will be a (pointer, capacity, length)
/// triplet. No more, no less. The order of these fields is completely
/// unspecified, and you should use the appropriate methods to modify these.
/// The pointer will never be null, so this type is null-pointer-optimized.
///
/// However, the pointer may not actually point to allocated memory. In particular,
/// if you construct a `Vec` with capacity 0 via [`Vec::new`], [`vec![]`][`vec!`],
/// [`Vec::with_capacity(0)`][`Vec::with_capacity`], or by calling [`shrink_to_fit`]
/// on an empty Vec, it will not allocate memory. Similarly, if you store zero-sized
/// types inside a `Vec`, it will not allocate space for them. *Note that in this case
/// the `Vec` may not report a [`capacity`] of 0*. `Vec` will allocate if and only
/// if [`mem::size_of::<T>`]`() * capacity() > 0`. In general, `Vec`'s allocation
/// details are very subtle &mdash; if you intend to allocate memory using a `Vec`
/// and use it for something else (either to pass to unsafe code, or to build your
/// own memory-backed collection), be sure to deallocate this memory by using
/// `from_raw_parts` to recover the `Vec` and then dropping it.
///
/// If a `Vec` *has* allocated memory, then the memory it points to is on the heap
/// (as defined by the allocator Rust is configured to use by default), and its
/// pointer points to [`len`] initialized elements in order (what you would see
/// if you coerced it to a slice), followed by [`capacity`]` - `[`len`]
/// logically uninitialized elements.
///
/// `Vec` will never perform a "small optimization" where elements are actually
/// stored on the stack for two reasons:
///
/// * It would make it more difficult for unsafe code to correctly manipulate
///   a `Vec`. The contents of a `Vec` wouldn't have a stable address if it were
///   only moved, and it would be more difficult to determine if a `Vec` had
///   actually allocated memory.
///
/// * It would penalize the general case, incurring an additional branch
///   on every access.
///
/// `Vec` will never automatically shrink itself, even if completely empty. This
/// ensures no unnecessary allocations or deallocations occur. Emptying a `Vec`
/// and then filling it back up to the same [`len`] should incur no calls to
/// the allocator. If you wish to free up unused memory, use
/// [`shrink_to_fit`][`shrink_to_fit`].
///
/// [`push`] and [`insert`] will never (re)allocate if the reported capacity is
/// sufficient. [`push`] and [`insert`] *will* (re)allocate if
/// [`len`]` == `[`capacity`]. That is, the reported capacity is completely
/// accurate, and can be relied on. It can even be used to manually free the memory
/// allocated by a `Vec` if desired. Bulk insertion methods *may* reallocate, even
/// when not necessary.
///
/// `Vec` does not guarantee any particular growth strategy when reallocating
/// when full, nor when [`reserve`] is called. The current strategy is basic
/// and it may prove desirable to use a non-constant growth factor. Whatever
/// strategy is used will of course guarantee `O(1)` amortized [`push`].
///
/// `vec![x; n]`, `vec![a, b, c, d]`, and
/// [`Vec::with_capacity(n)`][`Vec::with_capacity`], will all produce a `Vec`
/// with exactly the requested capacity. If [`len`]` == `[`capacity`],
/// (as is the case for the [`vec!`] macro), then a `Vec<T>` can be converted to
/// and from a [`Box<[T]>`][owned slice] without reallocating or moving the elements.
///
/// `Vec` will not specifically overwrite any data that is removed from it,
/// but also won't specifically preserve it. Its uninitialized memory is
/// scratch space that it may use however it wants. It will generally just do
/// whatever is most efficient or otherwise easy to implement. Do not rely on
/// removed data to be erased for security purposes. Even if you drop a `Vec`, its
/// buffer may simply be reused by another `Vec`. Even if you zero a `Vec`'s memory
/// first, that may not actually happen because the optimizer does not consider
/// this a side-effect that must be preserved. There is one case which we will
/// not break, however: using `unsafe` code to write to the excess capacity,
/// and then increasing the length to match, is always valid.
///
/// `Vec` does not currently guarantee the order in which elements are dropped
/// (the order has changed in the past, and may change again).
///
/// [`vec!`]: ../../std/macro.vec.html
/// [`Index`]: ../../std/ops/trait.Index.html
/// [`String`]: ../../std/string/struct.String.html
/// [`&str`]: ../../std/primitive.str.html
/// [`Vec::with_capacity`]: ../../std/vec/struct.Vec.html#method.with_capacity
/// [`Vec::new`]: ../../std/vec/struct.Vec.html#method.new
/// [`shrink_to_fit`]: ../../std/vec/struct.Vec.html#method.shrink_to_fit
/// [`capacity`]: ../../std/vec/struct.Vec.html#method.capacity
/// [`mem::size_of::<T>`]: ../../std/mem/fn.size_of.html
/// [`len`]: ../../std/vec/struct.Vec.html#method.len
/// [`push`]: ../../std/vec/struct.Vec.html#method.push
/// [`insert`]: ../../std/vec/struct.Vec.html#method.insert
/// [`reserve`]: ../../std/vec/struct.Vec.html#method.reserve
/// [owned slice]: ../../std/boxed/struct.Box.html

var Vec = function (_nobject_1$NObject) {
    _inherits(Vec, _nobject_1$NObject);

    function Vec() {
        _classCallCheck(this, Vec);

        /// Returns the number of elements the vector can hold without
        /// reallocating.
        ///
        /// # Examples
        ///
        /// ```
        /// let vec: Vec<i32> = Vec::with_capacity(10);
        /// assert_eq!(vec.capacity(), 10);
        /// ```
        /**
         * @param self
         * @return usize
         */
        var _this = _possibleConstructorReturn(this, (Vec.__proto__ || Object.getPrototypeOf(Vec)).apply(this, arguments));

        _this.capacity = function () {
            return vm_1.call(3865263801, [_this.self]);
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[u8]
         */
        _this.asSliceU8 = function () {
            var result = vm_1.call(2115662480, [_this.self]);
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return u8
         */
        _this.swapRemoveU8 = function (index) {
            return vm_1.call(645064753, [_this.self, index]);
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertU8 = function (index, element) {
            vm_1.call(3352453288, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return u8
         */
        _this.removeU8 = function (index) {
            return vm_1.call(2151809700, [_this.self, index]);
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushU8 = function (value) {
            vm_1.call(107439253, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<u8>
         */
        _this.popU8 = function () {
            var result = vm_1.call(2913114375, [_this.self]);
            if (result !== undefined && result !== null) {}
            return result;
        };
        /// Clears the vector, removing all values.
        ///
        /// Note that this method has no effect on the allocated capacity
        /// of the vector.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        ///
        /// v.clear();
        ///
        /// assert!(v.is_empty());
        /// ```
        /**
         * @param self
         */
        _this.clear = function () {
            vm_1.call(4154086477, [_this.self]);
        };
        /// Returns the number of elements in the vector, also referred to
        /// as its 'length'.
        ///
        /// # Examples
        ///
        /// ```
        /// let a = vec![1, 2, 3];
        /// assert_eq!(a.len(), 3);
        /// ```
        /**
         * @param self
         * @return usize
         */
        _this.len = function () {
            return vm_1.call(1534577376, [_this.self]);
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[pi_db::db::TabKV]
         */
        _this.asSliceTabKV = function () {
            var result = vm_1.call(580562131, [_this.self]);
            for (var i = 0; i < result.length; i++) {
                result[i] = new db_1.TabKV(result[i]);
            }
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return pi_db::db::TabKV
         */
        _this.swapRemoveTabKV = function (index) {
            var result = vm_1.call(3697063043, [_this.self, index]);
            result = new db_1.TabKV(result);
            return result;
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertTabKV = function (index, element) {
            element = element.self;
            vm_1.call(952027254, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return pi_db::db::TabKV
         */
        _this.removeTabKV = function (index) {
            var result = vm_1.call(482264970, [_this.self, index]);
            result = new db_1.TabKV(result);
            return result;
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushTabKV = function (value) {
            value = value.self;
            vm_1.call(393347340, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<pi_db::db::TabKV>
         */
        _this.popTabKV = function () {
            var result = vm_1.call(3897029640, [_this.self]);
            if (result !== undefined && result !== null) {
                result = new db_1.TabKV(result);
            }
            return result;
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[i64]
         */
        _this.asSliceI64 = function () {
            var result = vm_1.call(1239372537, [_this.self]);
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return i64
         */
        _this.swapRemoveI64 = function (index) {
            return vm_1.call(859758326, [_this.self, index]);
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertI64 = function (index, element) {
            vm_1.call(498200772, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return i64
         */
        _this.removeI64 = function (index) {
            return vm_1.call(2071154981, [_this.self, index]);
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushI64 = function (value) {
            vm_1.call(2957693395, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<i64>
         */
        _this.popI64 = function () {
            var result = vm_1.call(802425326, [_this.self]);
            if (result !== undefined && result !== null) {
                result = bigInt(result);
            }
            return result;
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[String]
         */
        _this.asSliceString = function () {
            var result = vm_1.call(3093995464, [_this.self]);
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return String
         */
        _this.swapRemoveString = function (index) {
            return vm_1.call(3156648318, [_this.self, index]);
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertString = function (index, element) {
            vm_1.call(1978728938, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return String
         */
        _this.removeString = function (index) {
            return vm_1.call(1210159287, [_this.self, index]);
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushString = function (value) {
            vm_1.call(3803919743, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<String>
         */
        _this.popString = function () {
            var result = vm_1.call(3830052262, [_this.self]);
            if (result !== undefined && result !== null) {}
            return result;
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[Arc<Vec<u8>>]
         */
        _this.asSliceArc = function () {
            var result = vm_1.call(2606142630, [_this.self]);
            for (var i = 0; i < result.length; i++) {
                result[i] = new Vec(result[i]);
            }
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return Arc<Vec<u8>>
         */
        _this.swapRemoveArc = function (index) {
            var result = vm_1.call(12783470, [_this.self, index]);
            result = new Vec(result);
            return result;
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertArc = function (index, element) {
            element = element.self;
            vm_1.call(1981878306, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return Arc<Vec<u8>>
         */
        _this.removeArc = function (index) {
            var result = vm_1.call(3566885191, [_this.self, index]);
            result = new Vec(result);
            return result;
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushArc = function (value) {
            value = value.self;
            vm_1.call(1441496172, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<Arc<Vec<u8>>>
         */
        _this.popArc = function () {
            var result = vm_1.call(2704292785, [_this.self]);
            if (result !== undefined && result !== null) {
                result = new Vec(result);
            }
            return result;
        };
        /// Extracts a slice containing the entire vector.
        ///
        /// Equivalent to `&s[..]`.
        ///
        /// # Examples
        ///
        /// ```
        /// use std::io::{self, Write};
        /// let buffer = vec![1, 2, 3, 5, 8];
        /// io::sink().write(buffer.as_slice()).unwrap();
        /// ```
        /**
         * @param self
         * @return &[u32]
         */
        _this.asSliceU32 = function () {
            var result = vm_1.call(2842251538, [_this.self]);
            return result;
        };
        /// Removes an element from the vector and returns it.
        ///
        /// The removed element is replaced by the last element of the vector.
        ///
        /// This does not preserve ordering, but is O(1).
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec!["foo", "bar", "baz", "qux"];
        ///
        /// assert_eq!(v.swap_remove(1), "bar");
        /// assert_eq!(v, ["foo", "qux", "baz"]);
        ///
        /// assert_eq!(v.swap_remove(0), "foo");
        /// assert_eq!(v, ["baz", "qux"]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return u32
         */
        _this.swapRemoveU32 = function (index) {
            return vm_1.call(1587209337, [_this.self, index]);
        };
        /// Inserts an element at position `index` within the vector, shifting all
        /// elements after it to the right.
        ///
        /// # Panics
        ///
        /// Panics if `index > len`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// vec.insert(1, 4);
        /// assert_eq!(vec, [1, 4, 2, 3]);
        /// vec.insert(4, 5);
        /// assert_eq!(vec, [1, 4, 2, 3, 5]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @param element:T
         */
        _this.insertU32 = function (index, element) {
            vm_1.call(3744706321, [_this.self, index, element]);
        };
        /// Removes and returns the element at position `index` within the vector,
        /// shifting all elements after it to the left.
        ///
        /// # Panics
        ///
        /// Panics if `index` is out of bounds.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut v = vec![1, 2, 3];
        /// assert_eq!(v.remove(1), 2);
        /// assert_eq!(v, [1, 3]);
        /// ```
        /**
         * @param self
         * @param index:usize
         * @return u32
         */
        _this.removeU32 = function (index) {
            return vm_1.call(2103362090, [_this.self, index]);
        };
        /// Appends an element to the back of a collection.
        ///
        /// # Panics
        ///
        /// Panics if the number of elements in the vector overflows a `usize`.
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2];
        /// vec.push(3);
        /// assert_eq!(vec, [1, 2, 3]);
        /// ```
        /**
         * @param self
         * @param value:T
         */
        _this.pushU32 = function (value) {
            vm_1.call(1420742667, [_this.self, value]);
        };
        /// Removes the last element from a vector and returns it, or [`None`] if it
        /// is empty.
        ///
        /// [`None`]: ../../std/option/enum.Option.html#variant.None
        ///
        /// # Examples
        ///
        /// ```
        /// let mut vec = vec![1, 2, 3];
        /// assert_eq!(vec.pop(), Some(3));
        /// assert_eq!(vec, [1, 2]);
        /// ```
        /**
         * @param self
         * @return Option<u32>
         */
        _this.popU32 = function () {
            var result = vm_1.call(3987113084, [_this.self]);
            if (result !== undefined && result !== null) {}
            return result;
        };
        return _this;
    }

    return Vec;
}(nobject_1.NObject);

Vec._$info = new sinfo_1.StructInfo("pi_pt/rust/def/vec.Vec", 4144079164, new Map(), []);
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<u8>
 */
Vec.newU8 = function () {
    var result = vm_1.call(278583573, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<u8>
 */
Vec.withCapacityU8 = function (capacity) {
    var result = vm_1.call(605387716, [capacity]);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<pi_db::db::TabKV>
 */
Vec.newTabKV = function () {
    var result = vm_1.call(3787109479, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<pi_db::db::TabKV>
 */
Vec.withCapacityTabKV = function (capacity) {
    var result = vm_1.call(3760459365, [capacity]);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<i64>
 */
Vec.newI64 = function () {
    var result = vm_1.call(1982375693, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<i64>
 */
Vec.withCapacityI64 = function (capacity) {
    var result = vm_1.call(3601066191, [capacity]);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<String>
 */
Vec.newString = function () {
    var result = vm_1.call(2399706024, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<String>
 */
Vec.withCapacityString = function (capacity) {
    var result = vm_1.call(3498998071, [capacity]);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<Arc<Vec<u8>>>
 */
Vec.newArc = function () {
    var result = vm_1.call(1828679694, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<Arc<Vec<u8>>>
 */
Vec.withCapacityArc = function (capacity) {
    var result = vm_1.call(2496158841, [capacity]);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>`.
///
/// The vector will not allocate until elements are pushed onto it.
///
/// # Examples
///
/// ```
/// # #![allow(unused_mut)]
/// let mut vec: Vec<i32> = Vec::new();
/// ```
/**
 * @return Vec<u32>
 */
Vec.newU32 = function () {
    var result = vm_1.call(1708919049, []);
    result = new Vec(result);
    return result;
};
/// Constructs a new, empty `Vec<T>` with the specified capacity.
///
/// The vector will be able to hold exactly `capacity` elements without
/// reallocating. If `capacity` is 0, the vector will not allocate.
///
/// It is important to note that this function does not specify the *length*
/// of the returned vector, but only the *capacity*. For an explanation of
/// the difference between length and capacity, see *[Capacity and reallocation]*.
///
/// [Capacity and reallocation]: #capacity-and-reallocation
///
/// # Examples
///
/// ```
/// let mut vec = Vec::with_capacity(10);
///
/// // The vector contains no items, even though it has capacity for more
/// assert_eq!(vec.len(), 0);
///
/// // These are all done without reallocating...
/// for i in 0..10 {
///     vec.push(i);
/// }
///
/// // ...but this may make the vector reallocate
/// vec.push(11);
/// ```
/**
 * @param capacity:usize
 * @return Vec<u32>
 */
Vec.withCapacityU32 = function (capacity) {
    var result = vm_1.call(1994007224, [capacity]);
    result = new Vec(result);
    return result;
};
exports.Vec = Vec;
})