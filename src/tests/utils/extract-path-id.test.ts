import { extractPathId } from '../../utils/extract-path-id';

describe('extractPathId', () => {
    it('should return path id', () => {
        expect(extractPathId('/product/1')).toBe(1);
    });
    it('should return -1 if there is no id or id is not valid', () => {
        expect(extractPathId('/product/ytfyc')).toBe(-1);
        expect(extractPathId('/product/')).toBe(-1);
    });
    it('should return -1 if path is not /product/:id', () => {
        expect(extractPathId('/product/ytfyc/1')).toBe(-1);
        expect(extractPathId('/product/ytfyc/frfw/1')).toBe(-1);
        expect(extractPathId('/product/ytfyc/frfw/iwefh/1')).toBe(-1);
    });
});
