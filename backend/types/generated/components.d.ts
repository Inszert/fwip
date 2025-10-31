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

export interface DefaultIngredient extends Struct.ComponentSchema {
  collectionName: 'components_basic_ingredients';
  info: {
    displayName: 'Ingredient';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    rotation: Schema.Attribute.Integer;
    size: Schema.Attribute.Integer;
    x: Schema.Attribute.Integer;
    y: Schema.Attribute.Integer;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basic.button': BasicButton;
      'basic.seo': BasicSeo;
      'default.ingredient': DefaultIngredient;
      'portobello.hwd-option': PortobelloHwdOption;
      'portobello.image-text-combo': PortobelloImageTextCombo;
      'portobello.portobello-hwd': PortobelloPortobelloHwd;
      'portobello.portobello-primary': PortobelloPortobelloPrimary;
      'portobello.portobello-secondary': PortobelloPortobelloSecondary;
      'sections.main-primary': SectionsMainPrimary;
    }
  }
}
