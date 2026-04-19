import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import GalleryMixin "mixins/gallery-api";
import List "mo:core/List";
import Types "types/gallery";

actor {
  include MixinObjectStorage();

  let images = List.empty<Types.Image>();
  var nextImageId : Nat = 0;

  include GalleryMixin(images, nextImageId);
};
