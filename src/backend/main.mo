import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import GalleryMixin "mixins/gallery-api";
import AuthMixin "mixins/auth-api";
import List "mo:core/List";
import Types "types/gallery";
import AuthTypes "types/auth";

actor {
  include MixinObjectStorage();

  let images = List.empty<Types.Image>();
  var nextImageId : Nat = 0;

  let authState : AuthTypes.AuthState = { var adminPrincipal = null };

  include AuthMixin(authState);
  include GalleryMixin(images, nextImageId, authState);
};
