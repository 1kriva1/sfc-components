import { TemplateReferenceDirective } from './template-reference.directive';

describe('TemplateRefDirective', () => {
  it('should create an instance', () => {
    const directive = new TemplateReferenceDirective(null);
    expect(directive).toBeTruthy();
  });
});
