import type { Schema, Struct } from '@strapi/strapi';

export interface BasicButton extends Struct.ComponentSchema {
  collectionName: 'components_basic_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    color: Schema.Attribute.String;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface BasicListForComparison extends Struct.ComponentSchema {
  collectionName: 'components_basic_list_for_comparisons';
  info: {
    displayName: 'List_for_comparison';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
  };
}

export interface BasicPropertyList extends Struct.ComponentSchema {
  collectionName: 'components_basic_property_lists';
  info: {
    displayName: 'property_list';
  };
  attributes: {
    property: Schema.Attribute.String;
    result: Schema.Attribute.Component<'basic.result-comperison', true>;
  };
}

export interface BasicResultComperison extends Struct.ComponentSchema {
  collectionName: 'components_basic_result_comperisons';
  info: {
    displayName: 'result_comperison';
  };
  attributes: {
    result: Schema.Attribute.Boolean;
  };
}

export interface BasicSeo extends Struct.ComponentSchema {
  collectionName: 'components_basic_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DefaultCircularVideo extends Struct.ComponentSchema {
  collectionName: 'components_default_circular_videos';
  info: {
    displayName: 'circular_video';
  };
  attributes: {
    text: Schema.Attribute.String;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface DefaultIngredient extends Struct.ComponentSchema {
  collectionName: 'components_basic_ingredients';
  info: {
    displayName: 'Ingredient';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    rotation: Schema.Attribute.Integer;
    size: Schema.Attribute.Integer;
    x: Schema.Attribute.Integer;
    y: Schema.Attribute.Integer;
  };
}

export interface FooterBottomLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_bottom_links';
  info: {
    displayName: 'bottomLinks';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterOptionalSlots extends Struct.ComponentSchema {
  collectionName: 'components_footer_optional_slots_s';
  info: {
    description: '';
    displayName: 'optionalSlots ';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface IceCreamTimestamps extends Struct.ComponentSchema {
  collectionName: 'components_ice_cream_timestamps';
  info: {
    displayName: 'timestamps';
  };
  attributes: {
    end_time: Schema.Attribute.String;
    side: Schema.Attribute.Enumeration<['right', 'left']>;
    start_time: Schema.Attribute.String;
    text1: Schema.Attribute.String;
    text2: Schema.Attribute.String;
  };
}

export interface IceCreamVideoToSeparateIce extends Struct.ComponentSchema {
  collectionName: 'components_ice_cream_video_to_separate_ices';
  info: {
    displayName: 'video_to_separate_ice';
  };
  attributes: {
    data_for_sep: Schema.Attribute.Component<'ice-cream.timestamps', true>;
    video_separ: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface PlacesPlacesHero extends Struct.ComponentSchema {
  collectionName: 'components_places_places_heroes';
  info: {
    displayName: 'places-hero';
  };
  attributes: {
    bg_color: Schema.Attribute.String;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    text1: Schema.Attribute.String;
    text1_color: Schema.Attribute.String;
    text2: Schema.Attribute.String;
    text2_color: Schema.Attribute.String;
    text3: Schema.Attribute.String;
    text3_color: Schema.Attribute.String;
  };
}

export interface PortobelloHwdOption extends Struct.ComponentSchema {
  collectionName: 'components_portobello_hwd_options';
  info: {
    displayName: 'Hwd Option';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    orientacion: Schema.Attribute.Enumeration<['height', 'width', 'depth']>;
    text: Schema.Attribute.String;
  };
}

export interface PortobelloImageTextCombo extends Struct.ComponentSchema {
  collectionName: 'components_portobello_image_text_combos';
  info: {
    displayName: 'Image Text Combo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface PortobelloPortobelloHwd extends Struct.ComponentSchema {
  collectionName: 'components_portobello_portobello_hwds';
  info: {
    displayName: 'Portobello Hwd';
  };
  attributes: {
    button: Schema.Attribute.Component<'basic.button', true>;
    hwdOptions: Schema.Attribute.Component<'portobello.hwd-option', true>;
    textField1: Schema.Attribute.String;
    textField2: Schema.Attribute.String;
    textField3: Schema.Attribute.String;
  };
}

export interface PortobelloPortobelloPrimary extends Struct.ComponentSchema {
  collectionName: 'components_portobello_portobello_primaries';
  info: {
    displayName: 'Portobello Primary';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    textField1: Schema.Attribute.String;
    textField2: Schema.Attribute.String;
    textField3: Schema.Attribute.String;
  };
}

export interface PortobelloPortobelloSecondary extends Struct.ComponentSchema {
  collectionName: 'components_portobello_portobello_secondaries';
  info: {
    displayName: 'Portobello Secondary';
  };
  attributes: {
    imageTextCombo: Schema.Attribute.Component<
      'portobello.image-text-combo',
      true
    >;
    subtitle: Schema.Attribute.String;
  };
}

export interface SectionsMainPrimary extends Struct.ComponentSchema {
  collectionName: 'components_sections_main_primaries';
  info: {
    description: 'Main primary section component';
    displayName: 'Main Primary';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface UnitsUnits extends Struct.ComponentSchema {
  collectionName: 'components_units_units';
  info: {
    displayName: 'units';
  };
  attributes: {
    button: Schema.Attribute.Component<'basic.button', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text1: Schema.Attribute.String;
    text2: Schema.Attribute.String;
    text3: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.button': BasicButton;
      'basic.list-for-comparison': BasicListForComparison;
      'basic.property-list': BasicPropertyList;
      'basic.result-comperison': BasicResultComperison;
      'basic.seo': BasicSeo;
      'default.circular-video': DefaultCircularVideo;
      'default.ingredient': DefaultIngredient;
      'footer.bottom-links': FooterBottomLinks;
      'footer.optional-slots': FooterOptionalSlots;
      'ice-cream.timestamps': IceCreamTimestamps;
      'ice-cream.video-to-separate-ice': IceCreamVideoToSeparateIce;
      'places.places-hero': PlacesPlacesHero;
      'portobello.hwd-option': PortobelloHwdOption;
      'portobello.image-text-combo': PortobelloImageTextCombo;
      'portobello.portobello-hwd': PortobelloPortobelloHwd;
      'portobello.portobello-primary': PortobelloPortobelloPrimary;
      'portobello.portobello-secondary': PortobelloPortobelloSecondary;
      'sections.main-primary': SectionsMainPrimary;
      'units.units': UnitsUnits;
    }
  }
}
