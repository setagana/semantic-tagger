import { InputHandlerTests } from './application/input-handler/input-handler-tests';
import { TagSetterTests } from './application/tag-setter/tag-setter-tests';

describe('Task version 1 tests', function() {
    describe('InputHandler', InputHandlerTests.bind(this));
    describe('TagSetter', TagSetterTests.bind(this));
});