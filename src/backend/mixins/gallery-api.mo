import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import GalleryLib "../lib/gallery";
import Types "../types/gallery";

mixin (images : List.List<Types.Image>, nextImageId : Nat) {
  var _nextId : Nat = nextImageId;

  /// List all uploaded images (public, no auth required)
  public query func listImages() : async [Types.Image] {
    GalleryLib.listImages(images);
  };

  /// Upload a new image — accepts filename and blob reference, returns the new image record
  public shared func uploadImage(filename : Text, blob : Storage.ExternalBlob) : async Types.Image {
    let id = _nextId;
    _nextId += 1;
    GalleryLib.addImage(images, id, filename, blob);
  };

  /// Delete an image by ID — returns true if found and removed
  public shared func deleteImage(id : Types.ImageId) : async Bool {
    GalleryLib.deleteImage(images, id);
  };
};
