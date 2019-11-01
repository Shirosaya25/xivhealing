import { JobSortPipe } from './job-sort.pipe';

describe('JobSortPipe', () => {
  it('create an instance', () => {
    const pipe = new JobSortPipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
