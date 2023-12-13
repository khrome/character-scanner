[character-scanner](../README.md) / [Exports](../modules.md) / CharacterScanner

# Class: CharacterScanner

## Table of contents

### Constructors

- [constructor](CharacterScanner.md#constructor)

### Properties

- [buffer](CharacterScanner.md#buffer)
- [emit](CharacterScanner.md#emit)
- [intervals](CharacterScanner.md#intervals)
- [largestInterval](CharacterScanner.md#largestinterval)
- [off](CharacterScanner.md#off)
- [on](CharacterScanner.md#on)
- [once](CharacterScanner.md#once)
- [options](CharacterScanner.md#options)
- [scanners](CharacterScanner.md#scanners)
- [times](CharacterScanner.md#times)

### Methods

- [addScanner](CharacterScanner.md#addscanner)
- [allScanners](CharacterScanner.md#allscanners)
- [input](CharacterScanner.md#input)
- [removeAllScanners](CharacterScanner.md#removeallscanners)
- [scan](CharacterScanner.md#scan)

## Constructors

### constructor

• **new CharacterScanner**(`options?`): [`CharacterScanner`](CharacterScanner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ConstructorOptions` |

#### Returns

[`CharacterScanner`](CharacterScanner.md)

#### Defined in

[index.ts:59](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L59)

## Properties

### buffer

• **buffer**: `BufferItem`[] = `[]`

#### Defined in

[index.ts:35](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L35)

___

### emit

• `Optional` **emit**: (`type`: `string`, `message`: `string` \| `number` \| `object`) => `void`

#### Type declaration

▸ (`type`, `message`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `message` | `string` \| `number` \| `object` |

##### Returns

`void`

#### Defined in

[index.ts:57](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L57)

___

### intervals

• **intervals**: `object` = `{}`

#### Defined in

[index.ts:39](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L39)

___

### largestInterval

• **largestInterval**: `number` = `0`

#### Defined in

[index.ts:36](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L36)

___

### off

• `Optional` **off**: (`type`: `string`, `handler?`: `EventHandler`) => `EventHandler`

#### Type declaration

▸ (`type`, `handler?`): `EventHandler`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `handler?` | `EventHandler` |

##### Returns

`EventHandler`

#### Defined in

[index.ts:52](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L52)

___

### on

• `Optional` **on**: (`type`: `string`, `criteria`: `OriginalEventHandler` \| `Query`\<`object`\>, `handler?`: `OriginalEventHandler`) => `EventHandler`

#### Type declaration

▸ (`type`, `criteria`, `handler?`): `EventHandler`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `criteria` | `OriginalEventHandler` \| `Query`\<`object`\> |
| `handler?` | `OriginalEventHandler` |

##### Returns

`EventHandler`

#### Defined in

[index.ts:40](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L40)

___

### once

• `Optional` **once**: (`type`: `string`, `criteria`: `OriginalEventHandler` \| `Query`\<`object`\>, `handler?`: `OriginalEventHandler`) => `EventHandler`

#### Type declaration

▸ (`type`, `criteria`, `handler?`): `EventHandler`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `criteria` | `OriginalEventHandler` \| `Query`\<`object`\> |
| `handler?` | `OriginalEventHandler` |

##### Returns

`EventHandler`

#### Defined in

[index.ts:46](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L46)

___

### options

• **options**: `ConstructorOptions` = `{}`

#### Defined in

[index.ts:34](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L34)

___

### scanners

• **scanners**: `ScannerList` = `{}`

#### Defined in

[index.ts:38](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L38)

___

### times

• **times**: `number`[] = `[]`

#### Defined in

[index.ts:37](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L37)

## Methods

### addScanner

▸ **addScanner**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ScannerOptions` |

#### Returns

`void`

#### Defined in

[index.ts:64](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L64)

___

### allScanners

▸ **allScanners**(): `ScannerOptionsList`

#### Returns

`ScannerOptionsList`

#### Defined in

[index.ts:93](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L93)

___

### input

▸ **input**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[index.ts:131](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L131)

___

### removeAllScanners

▸ **removeAllScanners**(): `void`

#### Returns

`void`

#### Defined in

[index.ts:87](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L87)

___

### scan

▸ **scan**(`scanners?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scanners?` | `ScannerOptionsList` |

#### Returns

`void`

#### Defined in

[index.ts:102](https://github.com/khrome/character-scanner/blob/35a0b73/src/index.ts#L102)
