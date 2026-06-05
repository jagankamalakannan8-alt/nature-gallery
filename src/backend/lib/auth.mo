import Types "../types/auth";

module {
  /// Returns true if caller is the designated admin
  public func isAdmin(state : Types.AuthState, caller : Principal) : Bool {
    switch (state.adminPrincipal) {
      case (?admin) { admin == caller };
      case null { false };
    };
  };

  /// Called when a user authenticates via Internet Identity.
  /// The very first caller becomes admin; subsequent callers are regular viewers.
  /// Returns true if the caller is admin after this call.
  public func login(state : Types.AuthState, caller : Principal) : Bool {
    switch (state.adminPrincipal) {
      case null {
        state.adminPrincipal := ?caller;
        true;
      };
      case (?admin) { admin == caller };
    };
  };
};
