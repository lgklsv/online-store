import { extractPathId } from '../../utils/extract-path-id';

describe('extractPathId', () => {
    it('should return path id or -1 if there is no id', () => {
        expect(extractPathId('/product/1')).toBe(1);
    });
});
