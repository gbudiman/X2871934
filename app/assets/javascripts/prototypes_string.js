String.prototype.capitalize_first_letter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.translate_category = function() {
  switch(this.toString()) {
    case 'top_category': return 'TOPS';
    case 'bottom_category': return 'BOTTOMS';
    case 'onepiece_category': return 'ONEPIECES';
    default: return this.toUpperCase();
  }
}