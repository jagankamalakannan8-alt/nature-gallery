import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import GalleryLib "../lib/gallery";
import AuthLib "../lib/auth";
import Types "../types/gallery";
import AuthTypes "../types/auth";
import Runtime "mo:core/Runtime";

mixin (images : List.List<Types.Image>, nextImageId : Nat, authState : AuthTypes.AuthState) {
  var _nextId : Nat = nextImageId;

  /// List all uploaded images (public, no auth required)
  public query func listImages() : async [Types.Image] {
    GalleryLib.listImages(images);
  };

  /// Upload a new image — admin only
  public shared ({ caller }) func uploadImage(filename : Text, blob : Storage.ExternalBlob) : async Types.Image {
    if (not AuthLib.isAdmin(authState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    let id = _nextId;
    _nextId += 1;
    GalleryLib.addImage(images, id, filename, blob);
  };

  /// Delete an image by ID — admin only, returns true if found and removed
  public shared ({ caller }) func deleteImage(id : Types.ImageId) : async Bool {
    if (not AuthLib.isAdmin(authState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    GalleryLib.deleteImage(images, id);
  };
};
