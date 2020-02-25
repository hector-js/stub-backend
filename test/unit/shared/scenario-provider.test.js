'use strict';

const ScenarioProvider = require('../../../lib/app/shared/scenario-provider');
const chai = require('chai');
const db = require('../../data/scenario-provider.1.test');
const dbPost = require('../../data/scenario-provider.2.test');
const dbNoRequestBody = require('../../data/scenario-provider.4.test');
const dbXML = require('../../data/scenario-provider.3.test');
const dbPost5 = require('../../data/scenario-provider.5.test');
const dbPost6 = require('../../data/scenario-provider.6.test');
const dbPost7 = require('../../data/scenario-provider.7.test');
const dbPost8 = require('../../data/scenario-provider.8.test');

const expect = chai.expect;
const assert = chai.assert;

describe('scenario provider', () => {
  describe('#isInDB', () => {
    describe('path with one id', () => {
      it('should return endpoint selected if the path macths with the request url', () => {
        const request = '/customers/chris/identifier';

        const contextMatcher = new ScenarioProvider(request, db).isInDB();

        expect(contextMatcher).to.equal('/customers/{id}/identifier');
      });

      context('when the path has one field different', () => {
        it('should return null if the path does not exist', () => {
          const request = '/customers/chris/age';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });

    describe('path with different ids', () => {
      context('when the path contain one id and two parameters', () => {
        it('should return the proper endpoint', () => {
          const request = '/customers/123/data?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.equal('/customers/{id}/data?name={d1}&dateOfBirth={d2}');
        });
      });

      context('when the path contain more parameters than the db has', () => {
        it('should return undefined', () => {
          const request = '/customers/123/friend?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.undefined;
        });
      });
    });

    describe('path without any id', () => {
      context('when the paths are the same', () => {
        it('should return the enpoint', () => {
          const request = '/customers/age';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.equal('/customers/age');
        });
      });
      context('when the paths are different', () => {
        it('should return null', () => {
          const request = '/custome/tall';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });
  });

  describe('#getScenario', () => {
    describe('with unique scenario', () => {
      describe('one id', () => {
        it('should return the scenario given one specific id', () => {
          const request = '/customers/mark/identifier';
          const contextMatcher = new ScenarioProvider(request, db);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _id: 'mark',
              _headers: []
            },
            _res: {
              _body: {
                name: 'Mark'
              }
            }
          });
        });

        context('when more than one scenario is found', () => {
          it('should returns multiple sceanrios found body ', () => {
            const request = '/customers/juan/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const result = contextMatcher.getScenario(endpoint);

            expect(result).to.deep.equal({
              errorCode: 500,
              message: 'Multiple scenarios were found :('
            });
          });
        });

        context(' when no scenario is found', () => {
          it('should return 404 not found body', () => {
            const request = '/customers/lucas/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const result = contextMatcher.getScenario(endpoint);

            expect(result).to.deep.equal({
              errorCode: 404,
              message: 'Scenario not found in the resources! :('
            });
          });
        });
      });

      describe('multiple ids', () => {
        it('should return the scenario given one specific id', () => {
          const path = '/customers/valueOne/data?name=valueTwo&dateOfBirth=valueThree';
          const contextMatcher = new ScenarioProvider(path, db);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _headers: [],
              _id: 'valueOne',
              _d1: 'valueTwo',
              _d2: 'valueThree'
            },
            _res: {
              _body: {
                name: 'Nathan'
              }
            }
          });
        });
      });

      describe('no ids', () => {
        it('should return scenario', () => {
          const request = '/customers/age';
          const contextMatcher = new ScenarioProvider(request, db);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _headers: []
            },
            _res: {
              _body: {
                name: 'Nathan'
              }
            }
          });
        });

        context('when there are more than two scenarios', () => {
          it('should return 500 with the proper message', () => {
            const request = '/customers/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const result = contextMatcher.getScenario(endpoint);

            expect(result).to.deep.equal({
              errorCode: 500,
              message: 'Multiple scenarios were found :('
            });
          });
        });
      });

      describe('filters', () => {
        describe('filterByHeaders', () => {
          describe('keys', () => {
            it('should filter cases by key', () => {
              const path = '/edge-cases/filterByHeader';
              const headers = {
                key1: 'any1',
                key2: 'any2'
              };

              const contextMatcher = new ScenarioProvider(path, dbPost7, headers, null);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                _req: {
                  _headers: ['key1', 'key2']
                },
                _res: {
                  _body: {
                    name: 'other'
                  }
                }
              });
            });
          });

          describe('keys and value', () => {
            it('should filter cases by key', () => {
              const request = '/edge-cases/filterByHeader/array';
              const headers = {
                key1: 'value1',
                key2: 'value2'
              };
              const contextMatcher = new ScenarioProvider(request, dbPost7, headers, null);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                _req: {
                  _headers: {
                    key1: 'value1',
                    key2: 'value2'
                  }
                },
                _res: {
                  _body: {
                    name: 'other'
                  }
                }
              });
            });
          });

          describe('null', () => {
            it('returns not founde', () => {
              const request = '/edge-cases/filterByHeader/array';
              const headers = null;
              const contextMatcher = new ScenarioProvider(request, dbPost7, headers, null);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                errorCode: 500,
                message: 'Multiple scenarios were found :('
              });
            });
          });
        });

        describe('filterByCookies', () => {
          describe('keys', () => {
            it('should filter cases by key', () => {
              const request = '/edge-cases/filterByCookies';
              const cookies = {
                key1: 'any1',
                key2: 'any1'
              };
              const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                _req: {
                  _cookies: ['key1', 'key2']
                },
                _res: {
                  _body: {
                    name: 'other'
                  }
                }
              });
            });
          });

          describe('keys and value', () => {
            it('should filter cases by key', () => {
              const request = '/edge-cases/filterByCookies/array';
              const cookies = {
                key1: 'value1',
                key2: 'value2'
              };
              const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                _req: {
                  _cookies: {
                    key1: 'value1',
                    key2: 'value2'
                  }
                },
                _res: {
                  _body: {
                    name: 'other'
                  }
                }
              });
            });
          });

          describe('null', () => {
            it('returns not founde', () => {
              const request = '/edge-cases/filterByHeader/array';
              const cookies = null;
              const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
              const endpoint = contextMatcher.isInDB();

              const scenario = contextMatcher.getScenario(endpoint);

              expect(scenario).to.deep.equal({
                errorCode: 500,
                message: 'Multiple scenarios were found :('
              });
            });
          });
        });
      });
    });

    describe('xml', () => {
      context('when xml flag is set to true', () => {
        it('should return cases filtered by xml', () => {
          const request = '/xml';
          const contextMatcher = new ScenarioProvider(request, dbXML);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _id: 'juan',
              _headers: []
            },
            _res: {
              _xml: true,
              _body: '<xml><title><name>Whatever</name></title></xml>'
            }
          });
        });
      });

      context('when xml flag is set to true in two cases', () => {
        it('should filter by ids', () => {
          const request = '/xml2/pedro/data';
          const contextMatcher = new ScenarioProvider(request, dbXML);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _id: 'pedro',
              _headers: []
            },
            _res: {
              _xml: true,
              _body: '<xml><title><name>pedro</name></title></xml>'
            }
          });
        });
      });
    });
  });

  describe('#filterByRequest', () => {
    let scenarioProvider;
    beforeEach(() => {
      scenarioProvider = new ScenarioProvider(null, null);
    });

    describe('body', () => {
      context('when _excludeBodyFields exists', () => {
        it('should return the scenario with the request', () => {
          const req = {
            body: {
              data1: 'other',
              data2: 'data2',
              data3: {
                data4: 'other',
                data5: 'data5'
              }
            }
          };

          const scenario = scenarioProvider.filterByRequest(req, dbPost);

          expect(scenario).to.deep.equal({
            _req: {
              _id: 'juan',
              _headers: [],
              _body: {
                data1: null,
                data2: 'data2',
                data3: {
                  data4: null,
                  data5: 'data5'
                }
              },
              _excludeBodyFields: ['$.data1', '$.data3.data4']
            },
            _res: {
              _body: {
                name: 'second'
              }
            }
          });
        });
      });

      it('should return the scenario with the same request', () => {
        const req = {
          body: {
            data: 'data1'
          }
        };

        const scenario = scenarioProvider.filterByRequest(req, dbPost);

        expect(scenario).to.deep.equal({
          _req: {
            _id: 'juan',
            _headers: [],
            _body: {
              data: 'data1'
            }
          },
          _res: {
            _body: {
              name: 'Nathan'
            }
          }
        });
      });

      context('when no request is found', () => {
        it('should return not request found', () => {
          const req = {
            body: {
              data: 'data5'
            }
          };

          const scenario = scenarioProvider.filterByRequest(req, dbPost);

          expect(scenario).to.deep.equal({
            errorCode: 404,
            message: 'Request body not found in the resources! :('
          });
        });
      });

      it('should return the first scenario found', () => {
        const req = {
          body: {
            data: 'data6'
          }
        };

        const scenario = scenarioProvider.filterByRequest(req, dbPost);

        expect(Array.isArray(scenario)).to.be.false;
        expect(scenario).to.deep.equal({
          _req: {
            _id: 'juan',
            _headers: [],
            _body: {
              data: 'data6'
            }
          },
          _res: {
            _body: {
              name: 'first'
            }
          }
        });
      });

      describe('scenarios without body', () => {
        it('should return the first scenario found', () => {
          const req = {
            body: {
              data: 'data6'
            }
          };

          const scenario = scenarioProvider.filterByRequest(req, dbNoRequestBody);

          expect(Array.isArray(scenario)).to.be.false;
          expect(scenario).to.deep.equal({
            errorCode: 500,
            message: 'Multiple scenarios were found :('
          });
        });
      });
    });

    describe('bodyPath', () => {
      context('when bodyPath is matching', () => {
        it('should return the scenario', () => {
          const req = {
            body: {
              data: {
                name: 'superman',
                company: 'marvel'
              }
            }
          };

          const scenario = scenarioProvider.filterByRequest(req, dbPost5);

          expect(Array.isArray(scenario)).to.be.false;
          expect(scenario).to.deep.equal({
            _req: {
              _bodyPaths: { '$.data.name': 'superman' }
            },
            _res: {
              _body: {
                ok: 'you found superman and marvel!'
              }
            }
          });
        });
      });

      context('when _body and _bodyPath are in the same scenario', () => {
        it('should throw an error', () => {
          const req = {
            body: {
              data: 'data6'
            }
          };

          const fnError = () => scenarioProvider.filterByRequest(req, dbPost6);

          assert.throws(fnError, '_body and _bodyPath should not be added at the same time.');
        });
      });
    });
  });

  describe('#getScenarios', () => {
    describe('with unique scenario', () => {
      describe('one id', () => {
        it('should return the scenario given one specific id', () => {
          const request = '/customers/mark/identifier';
          const contextMatcher = new ScenarioProvider(request, db);
          const endpoint = contextMatcher.isInDB();

          const scenarios = contextMatcher.getScenarios(endpoint);

          expect(scenarios).to.exist;
          expect(scenarios.length).to.equal(1);
          expect(scenarios[0]).to.deep.equal({
            _req: {
              _id: 'mark',
              _headers: []
            },
            _res: {
              _body: {
                name: 'Mark'
              }
            }
          });
        });

        context('when more than one scenario is found', () => {
          it('should return an array of the scenarios found ', () => {
            const request = '/customers/juan/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const scenarios = contextMatcher.getScenarios(endpoint);

            expect(scenarios).to.exist;
            expect(scenarios.length).to.equal(2);
            const expectScenario = {
              _req: {
                _id: 'juan',
                _headers: []
              },
              _res: {
                _body: {
                  name: 'Nathan'
                }
              }
            };
            expect(scenarios[0]).to.deep.equal(expectScenario);
            expect(scenarios[1]).to.deep.equal(expectScenario);
          });
        });

        context('when no scenario is found', () => {
          it('should return 404 not found body', () => {
            const request = '/customers/lucas/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const result = contextMatcher.getScenarios(endpoint);

            expect(result).to.deep.equal({
              errorCode: 404,
              message: 'Scenario not found in the resources! :('
            });
          });
        });
      });

      describe('more than one scenario', () => {
        context('when the request contain different ids and parameters', () => {
          it('should return the scenario given one specific id', () => {
            const request = '/customers/valueOne/data?name=valueTwo&dateOfBirth=valueThree';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const scenarios = contextMatcher.getScenarios(endpoint);

            expect(scenarios).to.exist;
            expect(scenarios.length).to.equal(1);
            expect(scenarios[0]).to.deep.equal({
              _req: {
                _headers: [],
                _id: 'valueOne',
                _d1: 'valueTwo',
                _d2: 'valueThree'
              },
              _res: {
                _body: {
                  name: 'Nathan'
                }
              }
            });
          });
        });
      });

      describe('no ids', () => {
        it('should return scenario', () => {
          const request = '/customers/age';
          const contextMatcher = new ScenarioProvider(request, db);
          const endpoint = contextMatcher.isInDB();

          const scenario = contextMatcher.getScenario(endpoint);

          expect(scenario).to.deep.equal({
            _req: {
              _headers: []
            },
            _res: {
              _body: {
                name: 'Nathan'
              }
            }
          });
        });

        context('when there are more than two scenarios', () => {
          it('should return 500 with the proper message', () => {
            const request = '/customers/multiple/scenarios';
            const contextMatcher = new ScenarioProvider(request, db);
            const endpoint = contextMatcher.isInDB();

            const result = contextMatcher.getScenario(endpoint);

            expect(result).to.deep.equal({
              errorCode: 500,
              message: 'Multiple scenarios were found :('
            });
          });
        });
      });
    });

    describe('xml', () => {
      context('when xml flag is set to true', () => {
        it('should return cases with xml', () => {
          const request = '/xml/lucas/xml';
          const contextMatcher = new ScenarioProvider(request, dbXML);
          const endpoint = contextMatcher.isInDB();

          const scenarios = contextMatcher.getScenarios(endpoint);

          expect(scenarios).to.exist;
          expect(scenarios.length).to.equal(2);
          expect(scenarios[0]).to.deep.equal({
            _req: {
              _id: 'lucas',
              _headers: []
            },
            _res: {
              _xml: true,
              _body: '<xml><title><name>Lucas1</name></title></xml>'
            }
          });
          expect(scenarios[1]).to.deep.equal({
            _req: {
              _id: 'lucas',
              _headers: []
            },
            _res: {
              _body: '<xml><title><name>Lucas3</name></title></xml>',
              _xml: true
            }
          });
        });
      });
    });

    describe('validation', () => {
      it('returns _req missing message', () => {
        const path = '/edge-cases/validation/req';
        const contextMatcher = new ScenarioProvider(path, dbPost8, null, null);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenarios(endpoint);

        expect(scenario).to.deep.equal({
          errorCode: 500,
          message: '_req is missed in some scenario :('
        });
      });

      it('returns _res missing message', () => {
        const path = '/edge-cases/validation/res';
        const contextMatcher = new ScenarioProvider(path, dbPost8, null, null);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenarios(endpoint);

        expect(scenario).to.deep.equal({
          errorCode: 500,
          message: '_res is missed in some scenario :('
        });
      });
    });

    describe('filters', () => {
      describe('filterByHeaders', () => {
        describe('keys', () => {
          it('should filter cases by key', () => {
            const path = '/edge-cases/filterByHeader';
            const headers = {
              key1: 'value1',
              key2: 'value2'
            };
            const contextMatcher = new ScenarioProvider(path, dbPost7, headers, null);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario).to.deep.equal([{
              _req: {
                _headers: ['key1', 'key2']
              },
              _res: {
                _body: {
                  name: 'other'
                }
              }
            }]);
          });
        });

        describe('keys and value', () => {
          it('should filter cases by key', () => {
            const request = '/edge-cases/filterByHeader/array';
            const headers = {
              key1: 'value1',
              key2: 'value2'
            };
            const contextMatcher = new ScenarioProvider(request, dbPost7, headers, null);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario).to.deep.equal([{
              _req: {
                _headers: {
                  key1: 'value1',
                  key2: 'value2'
                }
              },
              _res: {
                _body: {
                  name: 'other'
                }
              }
            }]);
          });
        });

        describe('null', () => {
          it('returns not founde', () => {
            const request = '/edge-cases/filterByHeader/array';
            const headers = null;
            const contextMatcher = new ScenarioProvider(request, dbPost7, headers, null);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario.length).to.deep.equal(3);
          });
        });
      });

      describe('filterByCookies', () => {
        describe('keys', () => {
          it('should filter cases by key', () => {
            const request = '/edge-cases/filterByCookies';
            const cookies = {
              key1: 'value1',
              key2: 'value2'
            };
            const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario).to.deep.equal([{
              _req: {
                _cookies: ['key1', 'key2']
              },
              _res: {
                _body: {
                  name: 'other'
                }
              }
            }]);
          });
        });

        describe('keys and value', () => {
          it('should filter cases by key', () => {
            const request = '/edge-cases/filterByCookies/array';
            const cookies = {
              key1: 'value1',
              key2: 'value2'
            };
            const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario).to.deep.equal([{
              _req: {
                _cookies: {
                  key1: 'value1',
                  key2: 'value2'
                }
              },
              _res: {
                _body: {
                  name: 'other'
                }
              }
            }]);
          });
        });

        describe('null', () => {
          it('returns not founde', () => {
            const request = '/edge-cases/filterByHeader/array';
            const cookies = null;
            const contextMatcher = new ScenarioProvider(request, dbPost7, null, cookies);
            const endpoint = contextMatcher.isInDB();

            const scenario = contextMatcher.getScenarios(endpoint);

            expect(scenario.length).to.equal(3);
          });
        });
      });
    });
  });

  describe('#getKeyValueUri', () => {
    it('should return an array of key values', () => {
      const contextMatcher = new ScenarioProvider('/customer/hello/data/any');

      const result = contextMatcher.getKeyValueUri('/customer/{v0}/data/{v1}');

      expect(result).to.deep.equal([{ _v0: 'hello' }, { _v1: 'any' }]);
    });
  });
});
